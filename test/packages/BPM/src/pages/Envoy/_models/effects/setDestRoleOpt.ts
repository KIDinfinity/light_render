import lodash from 'lodash';
import moment from 'moment';
import { safeParseUtil } from '@/utils/utils';
import { transferToObj } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import getCurRoleInfo from 'bpm/pages/Envoy/_utils/getCurRoleInfo';
import getTheReplacedWithTpl from 'bpm/pages/Envoy/_utils/getTheReplacedWithTpl';
import { EModuleName, EReasonStatus } from 'bpm/pages/Envoy/enum';
import findReminderConfig from 'bpm/pages/Envoy/_utils/findReminderConfig';

interface IAction {
  payload: {
    groupIdx: number;
    groupCode: string;
  };
}

export default function* setReasonGroup({ payload }: IAction, { select, put, call }: any) {
  const { groupIdx, groupCode } = lodash.pick(payload, ['groupIdx', 'groupCode']);
  const replaceData = (origin: any, template: any) =>
    !lodash.isBoolean(origin) && lodash.size(origin) === 0 ? template : origin;

  const { businessNo, currentReasonGroups, reasonConfigs } = yield select(
    (state: any) => state.envoyController
  );

  const currentReasonConfig = lodash
    .chain(reasonConfigs)
    .pickBy(lodash.isObject as any)
    .find({ code: groupCode })
    .value();

  const reasonDetails = lodash.map(
    lodash.get(currentReasonConfig, 'reasonConfigs'),
    (config: any, configIndex: number) => {
      const currentReasonGroup = lodash.get(
        currentReasonGroups,
        `[${groupIdx}].reasonDetails[${configIndex}]`
      );

      const displayConfig = safeParseUtil(config?.displayConfig);
      return {
        ...currentReasonGroup,
        channelDataList: replaceData(
          currentReasonGroup?.channelDataList,
          lodash.map(lodash.get(config, 'roleChannelConfigs[0].channelTemplates'), (item: any) => ({
            channel: item?.channel,
            enable: item?.enable,
            content: item?.template,
          }))
        ),
        defaultChannel: replaceData(
          currentReasonGroup?.defaultChannel,
          lodash.get(config, 'roleChannelConfigs[0].defaultChannel')
        ),
        destRole: replaceData(
          currentReasonGroup?.destRole,
          lodash.get(config, 'roleChannelConfigs[0].destRole')
        ),
        destRoleOpt: replaceData(
          currentReasonGroup?.destRoleOpt,
          lodash.map(lodash.get(config, 'roleChannelConfigs'), (item: any) => item?.destRole)
        ),
        dispatchDate: replaceData(currentReasonGroup?.dispatchDate, moment().format()),
        policy: replaceData(
          currentReasonGroup?.policy,
          lodash.get(config, 'policy') ||
          JSON.stringify([
            {
              policyList: [],
              correspondenceRemark: '',
              otherReason: '',
              reasonList: [],
              date: '',
            },
          ])
        ),
        attachment: replaceData(
          currentReasonGroup?.attachment,
          lodash.get(config, 'attachment') || JSON.stringify([''])
        ),
        payment: replaceData(currentReasonGroup?.payment, lodash.get(config, 'payment') || ''),
        remark: replaceData(currentReasonGroup?.remark, lodash.get(config, 'remark') || ''),
        delayLetter: replaceData(
          currentReasonGroup?.delayLetter,
          lodash.isBoolean(config?.delayLetter)
            ? config?.delayLetter
            : !!displayConfig?.delayLetter?.visible
        ),
        define: replaceData(currentReasonGroup?.define, lodash.get(config, 'define') || ''),
        letterCode: replaceData(currentReasonGroup?.letterCode, lodash.get(config, 'letterCode') || ''),
        reasonReminders: lodash.map(
          lodash.get(config, 'reminderConfigs'),
          (reminderConfig: any, reminderIndex: number) => {
            const currentReasonGroupReminder = lodash.get(
              currentReasonGroup,
              `reasonReminders[${reminderIndex}]`
            );
            return {
              dispatchDate: replaceData(
                currentReasonGroupReminder?.dispatchDate,
                moment().format()
              ),
              cron: replaceData(
                currentReasonGroupReminder?.cron,
                lodash.get(reminderConfig, 'cron')
              ),
              noticeLead: replaceData(
                currentReasonGroupReminder?.noticeLead,
                lodash.get(reminderConfig, 'noticeLead')
              ),
              reminderCode: replaceData(
                currentReasonGroupReminder?.reminderCode,
                lodash.get(reminderConfig, 'reminderCode')
              ),
              reminderSequence: replaceData(
                currentReasonGroupReminder?.reminderSequence,
                lodash.get(reminderConfig, 'reminderSequence')
              ),
              triggerCcm: replaceData(
                currentReasonGroupReminder?.triggerCcm,
                !!lodash.get(reminderConfig, 'triggerCcm')
              ),
              channelDataList: replaceData(
                currentReasonGroupReminder?.channelDataList,
                lodash.map(
                  lodash.get(reminderConfig, 'roleChannelConfigs[0].channelTemplates'),
                  (item: any) => ({
                    channel: item?.channel,
                    enable: item?.enable,
                    content: item?.template,
                  })
                )
              ),
              defaultChannel: replaceData(
                currentReasonGroupReminder?.defaultChannel,
                lodash.get(reminderConfig, 'roleChannelConfigs[0].defaultChannel')
              ),
              destRole: replaceData(
                currentReasonGroupReminder?.destRole,
                lodash.get(reminderConfig, 'roleChannelConfigs[0].destRole')
              ),
              destRoleOpt: replaceData(
                currentReasonGroupReminder?.destRoleOpt,
                lodash.map(
                  lodash.get(reminderConfig, 'roleChannelConfigs'),
                  (item: any) => item?.destRole
                )
              ),
            };
          }
        ),
        docGroupCodes: replaceData(
          currentReasonGroup?.docGroupCodes,
          lodash
            .chain(config?.docConfigs)
            .map((doc: any) => doc?.docGroupCode)
            .uniq()
            .value()
        ),
        reasonDocs: replaceData(
          currentReasonGroup?.reasonDocs,
          lodash.flattenDeep(
            lodash
              .map(config?.docConfigs, (doc: any) =>
                lodash
                  .chain(doc?.defaultDocTypeCodes)
                  .filter((item: any) => item.memoCode || item.memoSubcode)
                  .map((typeCode: string) => ({
                    docTypeCode: typeCode,
                    ...lodash.pick(doc, ['docGroupCode', 'enableComment', 'enableCopies']),
                  }))
                  .value()
              )
              .filter((item: any) => item.length)
          )
        ),
      };
    }
  );
  for (
    let reasonIdx = 0, reasonLen = reasonDetails?.length;
    reasonIdx < reasonLen;
    reasonIdx += 1
  ) {
    // 设置一些前端使用的变量
    reasonDetails[reasonIdx].claimNo = businessNo;

    reasonDetails[reasonIdx].displayConfig = lodash.isString(
      reasonDetails[reasonIdx]?.displayConfig
    )
      ? safeParseUtil(reasonDetails[reasonIdx]?.displayConfig)
      : reasonDetails[reasonIdx].displayConfig;
    // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
    reasonDetails[reasonIdx] = transferToObj(reasonDetails[reasonIdx]);

    const sortModuleArr = getSortModuleArr(reasonDetails[reasonIdx]?.displayConfig);
    const hasMemo = lodash.some(
      sortModuleArr,
      (module: any) => module.moduleName === EModuleName.PendingMemo
    );
    if (
      hasMemo &&
      reasonDetails[reasonIdx].status === EReasonStatus.DRAFT &&
      lodash.isEmpty(reasonDetails[reasonIdx]?.pendingMemoList)
    ) {
      reasonDetails[reasonIdx].pendingMemoList = [
        { memoCode: undefined, memoDesc: undefined, pendingDate: moment().format() },
      ];
    }

    // 将变量替换进模本中
    let destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
    let curDestRole =
      reasonDetails[reasonIdx]?.destRole || reasonDetails[reasonIdx]?.destRoleOpt[0];
    let roleInfoKey = `${businessNo}_${curDestRole}`;
    let curRoleInfo = getCurRoleInfo({
      businessNo,
      curDestRole,
      roleInfoKey,
      destRoleInfo,
    });
    if (!curRoleInfo) {
      yield put.resolve({
        type: 'getCurRoleInfo',
        payload: {
          curDestRole,
          roleInfoKey,
        },
      });
      destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
      curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
    }
    reasonDetails[reasonIdx] = getTheReplacedWithTpl(reasonDetails[reasonIdx], curRoleInfo);

    const { reasonReminders, reasonCode, startTime, period, displayConfig } = reasonDetails[
      reasonIdx
    ];
    const noReplaceReminderObject = Object.keys(reasonReminders)
      .filter(
        (reminderKey) =>
          !lodash.isBoolean(reasonReminders[reminderKey]) &&
          lodash.size(reasonReminders[reminderKey]) === 0
      )
      ?.reduce((result, current) => {
        result[current] = reasonReminders[current];
        return result;
      }, {});

    for (
      let reminderIdx = 0, reminderLen = reasonReminders?.length;
      reminderIdx < reminderLen;
      reminderIdx += 1
    ) {
      // 设置一些前端使用的变量
      reasonReminders[reminderIdx].status = 'Draft';
      reasonReminders[reminderIdx].claimNo = businessNo;
      reasonReminders[reminderIdx].reasonCode = reasonCode;
      reasonReminders[reminderIdx].startTime = startTime;
      reasonReminders[reminderIdx].period = period;
      reasonReminders[reminderIdx].reasonIdx = reasonIdx;
      reasonReminders[reminderIdx].reminderIdx = reminderIdx;
      reasonReminders[reminderIdx].displayConfig = lodash.get(displayConfig, 'reminder.children');
      // 统一先做一次数据转化（send、resolve、waived时会将转化的数据还原）
      reasonReminders[reminderIdx] = transferToObj(reasonReminders[reminderIdx]);

      // 将变量替换进模本中
      destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
      curDestRole =
        reasonReminders[reminderIdx]?.destRole || reasonReminders[reminderIdx]?.destRoleOpt[0];
      roleInfoKey = `${businessNo}_${curDestRole}`;
      curRoleInfo = getCurRoleInfo({
        businessNo,
        curDestRole,
        roleInfoKey,
        destRoleInfo,
      });
      if (!curRoleInfo) {
        yield put.resolve({
          type: 'getCurRoleInfo',
          payload: {
            curDestRole,
            roleInfoKey,
          },
        });
        destRoleInfo = yield select((state: any) => state.envoyController.destRoleInfo);
        curRoleInfo = lodash.get(destRoleInfo, roleInfoKey);
      }
      const reminderConfig = findReminderConfig({
        configs: reasonConfigs,
        groupCode,
        reasonCode,
        reminderCode: reasonReminders[reminderIdx].reminderCode,
      });
      reasonReminders[reminderIdx] = getTheReplacedWithTpl(
        reasonReminders[reminderIdx],
        curRoleInfo,
        reminderConfig
      );
      reasonDetails[reasonIdx] = { ...reasonDetails[reasonIdx], ...noReplaceReminderObject };
    }
  }

  lodash.set(currentReasonGroups, `[${groupIdx}].reasonDetails`, reasonDetails);

  yield put({
    type: 'saveReasonGroup',
    payload: {
      groupIdx,
      groupDetail: currentReasonGroups[groupIdx],
    },
  });
}
