import lodash from 'lodash';

import { safeParseUtil } from '@/utils/utils';
import { ESiderPermissions } from 'basic/enum';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';

const switchMap = {
  INFO: SwitchDrawerTab.Remark,
  ENVOY: SwitchDrawerTab.Pending,
};

const categoryMap = {
  INFO: ESiderPermissions.InformationManagement,
  ENVOY: ESiderPermissions.EnvoyManagement,
};

/**
 * 根据路径获取对象中的值和指定路径的 id
 * @param obj 要查询的对象
 * @param path 路径字符串，例如 "resultData[].categoryCode[].activite"
 * @param idKey id 的路径，例如 "resultData[].id"
 * @returns 对应的值数组 [{ value: xxx, id: xxx }]
 */
export function getValueByPathV3(obj: any, path: string, idKey: string): { value: any; id: any }[] {
  const pathSegments = path.split('.'); // 按 "." 分割路径
  const idSegments = idKey.split('.'); // 按 "." 分割 idKey 路径
  let results = [{ parent: null, current: obj, idParent: null }]; // 初始值为对象本身，包含父级信息和 id 父级信息

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    const isArray = segment.endsWith('[]'); // 判断是否为数组
    const key = isArray ? segment.slice(0, -2) : segment;

    results = results.flatMap(({ current, idParent }) => {
      if (current && typeof current === 'object' && key in current) {
        const next = current[key];
        const nextIdParent = idSegments[i] === segment ? current : idParent; // 更新 id 父级信息
        if (isArray && Array.isArray(next)) {
          return next.map((item) => ({ parent: current, current: item, idParent: nextIdParent }));
        } else {
          return [{ parent: current, current: next, idParent: nextIdParent }];
        }
      }
      return [];
    });
  }

  // 将结果转换为 [{ value: xxx, id: xxx }] 的结构
  return results.map(({ current, idParent }) => ({
    value: current,
    id: idParent?.[idSegments[idSegments.length - 1]] || null, // 获取 idKey 路径的最后一段
  }));
}

/**
 * 根据路径获取对象中的值和同层级的 id
 * @param obj 要查询的对象
 * @param path 路径字符串，例如 "resultData[].categoryCode[].activite"
 * @param idKey id 的键名，例如 "id"
 * @returns 对应的值数组 [{ value: xxx, id: xxx }]
 */
export function getValueByPathV2(
  obj: any,
  path: string,
  idKey: string = 'id'
): { value: any; id: any }[] {
  const segments = path.split('.'); // 按 "." 分割路径
  let results = [{ parent: null, current: obj }]; // 初始值为对象本身，包含父级信息

  for (const segment of segments) {
    const isArray = segment.endsWith('[]'); // 判断是否为数组
    const key = isArray ? segment.slice(0, -2) : segment;

    results = results.flatMap(({ current }) => {
      if (current && typeof current === 'object' && key in current) {
        const next = current[key];
        if (isArray && Array.isArray(next)) {
          return next.map((item) => ({ parent: current, current: item }));
        } else {
          return [{ parent: current, current: next }];
        }
      }
      return [];
    });
  }

  // 将结果转换为 [{ value: xxx, id: xxx }] 的结构
  return results.map(({ parent, current }) => ({
    value: current,
    id: parent?.[idKey] || current, // 获取同层级的 id，若不存在则为 current
  }));
}
/**
 * 判断是否存在一组数据的 match 全部为 true，并返回该组的第一项的 id
 * @param data 二元数组
 * @returns { result: boolean, id: string | null } 是否满足条件以及该组的第一项 id
 */
function isMatchByIndexWithId(data: any[][]): { result: boolean; id: string | null } {
  // 将所有子数组的数据按 index 分组
  const groupedByIndex = lodash.groupBy(
    data.flat(), // 将二元数组展平为一维数组
    'index' // 按 index 分组
  );

  // 遍历分组，检查是否存在一组 match 全部为 true
  for (const group of Object.values(groupedByIndex)) {
    const allMatch = group.every((item) => item.match === true);
    if (allMatch) {
      // 如果找到满足条件的组，返回该组的第一项的 id
      return { result: true, id: group[0]?.id || null };
    }
  }

  // 如果没有找到满足条件的组，返回 false 和 null
  return { result: false, id: null };
}

export default function* (action: any, { put, select }: any) {
  const taskDetail = yield select((state: any) => state.workspaceSwitchOn.taskDetail);
  const triggerModalData = yield select((state: any) => state.workspaceSwitchOn.triggerModalData);
  const autoTriggerConfig = yield select((state: any) => state.workspaceSwitchOn.autoTriggerConfig);
  const activeTask = yield select((state: any) => state.workspaceSwitchOn.activeTask);

  if (autoTriggerConfig.length === 0) {
    yield put({
      type: 'saveAutoTrigger',
      payload: {
        autoTrigger: false,
      },
    });
    return;
  }

  const { caseCategory, caseType } = taskDetail;
  const activityKey = taskDetail?.taskDefKey || taskDetail?.currentActivityKey;
  const taskStatus = taskDetail?.taskStatus || taskDetail?.status;

  const data = {
    ...(triggerModalData?.[`${activeTask.processInstanceId}_processInstanceId`] || {}),
    ...(triggerModalData?.[`${activeTask.taskId}_taskId`] || {}),
  };

  const matchConfig = lodash.map(autoTriggerConfig, (item: any) => {
    if (
      caseCategory === item.caseCategory &&
      (caseType === item.caseType || !item.caseType) &&
      activityKey === item.activityKey &&
      (!item.taskStatus || taskStatus === item.taskStatus)
    ) {
      const conditions = safeParseUtil(item.conditionJson);
      const validateData: any = [];

      lodash.forEach(conditions, (rule: any) => {
        const targetData = data[rule.api];
        lodash.forEach(rule.target, (target: any) => {
          const values: any = getValueByPathV2(targetData, target.path);
          const configValue = lodash.map(target.value, (configItem: string) =>
            lodash.toUpper(configItem)
          );

          const matchData = {
            rule: configValue,
            target: lodash.map(values, (up, upIndex) => ({
              ...up,
              value: lodash.toUpper(up.value),
              index: upIndex,
            })),
          };
          validateData.push(matchData);
          // const intersection = lodash.intersectionBy(configValue, values, 'value');
          // match = {
          //   result: intersection?.length > 0,
          //   ...(intersection?.[0] || {}),
          // };
        });
      });
      const reulstList = lodash.map(validateData, (validateItem: any) => {
        return lodash.map(validateItem.target, (targetItem: any) => {
          return {
            ...targetItem,
            match: lodash.includes(validateItem.rule, targetItem.value),
          };
        });
      });

      const match = isMatchByIndexWithId(reulstList);
      return { ...item, match };
    }
    return { ...item, match: { result: false } };
  });
  const matchResult = lodash
    .chain(matchConfig)
    .filter((item) => item.match.result)
    .minBy('priority')
    .value();

  if (!lodash.isEmpty(matchResult)) {
    const commonAuthorityList = yield select(
      (state: any) => state.authController.commonAuthorityList
    );
    const auth = lodash.find(commonAuthorityList, {
      authorityCode: categoryMap?.[matchResult?.functionType],
    })?.result;

    if (auth) {
      yield put({
        type: 'changeSwitch',
        payload: { name: switchMap?.[matchResult?.functionType] },
      });

      yield put({
        type: 'saveTriggerActiveTab',
        payload: {
          triggerActiveTab: matchResult?.match?.id,
        },
      });
    }
  }

  yield put({
    type: 'saveAutoTrigger',
    payload: {
      autoTrigger: false,
    },
  });

  // const taskId = action.payload?.taskId;
  // const processInstanceId = action.payload?.processInstanceId;
  // const autoTrigger = yield select((state: any) => state.workspaceSwitchOn.autoTrigger);
  // const triggerModalData = yield select((state: any) => state.workspaceSwitchOn.triggerModalData);
}
