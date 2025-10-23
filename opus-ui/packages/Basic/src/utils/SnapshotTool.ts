import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { Validator } from 'jsonschema';
import { snapshot } from '@/services/navigatorTaskInfoControllerService';
import { findReasonInfo } from '@/services/navigatorEnvoyControllerService';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import CaseCategory from 'enum/CaseCategory';
import NBschema from 'process/NB/ManualUnderwriting/bizData-schema';
import { LS, LSKey } from '@/utils/cache';

const validator = new Validator();

/**
 * TODO
 * 1. 获取sna数据
 */

interface IPropsAssemblePeingData {
  dataForSubmit: any;
  optionType: string;
  taskDetail: any;
}
interface IPropsAssembleDefaultData {
  dataForSubmit: any;
  optionType: string;
  taskDetail: any;
  dataType?: string;
  extra?: any;
  dispatch?: Function;
  taskNotEditable?: boolean;
  syncData?: boolean;
}

const getSchema: any = (caseCategory: string) => {
  const schemaMap = {
    // TODO
    [CaseCategory.BP_NB_CTG001]: NBschema,
    [CaseCategory.BP_NB_CTG002]: NBschema,
    [CaseCategory.BP_NB_CTG003]: NBschema,

    [CaseCategory.BP_NB_CTG005]: NBschema,

    [CaseCategory.VN_UW_CTG001]: NBschema,

    [CaseCategory.BP_AP_CTG02]: NBschema,
    [CaseCategory.BP_AP_CTG03]: NBschema,

    [CaseCategory.NB_UW_CTG001]: NBschema,
    [CaseCategory.NB_UW_CTG005]: NBschema,
    [CaseCategory.NB_UW_CTG006]: NBschema,
  };

  return schemaMap?.[caseCategory] ? schemaMap?.[caseCategory] : null;
};

// 校验数据是否为空
const validateBusinessData = ({
  dataForSubmit = {},
  result,
  optionType,
  dispatch,
  caseCategory,
}: any) => {
  const schema = getSchema(caseCategory);
  if (schema) {
    const schemaResult = validator.validate(dataForSubmit, schema);

    const validateErrors = lodash.get(schemaResult, 'errors', []);
    if (lodash.size(validateErrors) > 0) {
      if (lodash.isFunction(dispatch)) {
        dispatch({ type: 'processTask/save', payload: { snapshotModalVisible: true } });
      }
      return false;
    }
  }

  if (lodash.isEmpty(dataForSubmit)) {
    snapshot({
      ...result,
      snapshotDataList: lodash.map(result.snapshotDataList, (item: any) => {
        return optionType
          ? { ...item, dataType: `${item?.dataType}_error${optionType}` }
          : { ...item, dataType: `${item?.dataType}_error` };
      }),
    });
    return false;
  }
  return true;
};

const assembleDefaultDataForSave = async ({
  dataForSubmit,
  optionType,
  taskDetail,
  dataType = 'mainPage',
  extra = {},
  dispatch,
  taskNotEditable = false,
  syncData = false,
}: IPropsAssembleDefaultData) => {
  if (!!taskNotEditable) {
    return requestHandleType.break;
  }
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userName = lodash.get(currentUser, 'userName', '');
  const { taskId, processInstanceId, caseCategory, taskDefKey }: any = lodash.pick(taskDetail, [
    'taskId',
    'processInstanceId',
    'caseCategory',
    'taskDefKey',
  ]);

  const result = {
    processInstanceId,
    taskId,
    snapshotDataList: [
      {
        taskId,
        optionType,
        dataType,
        dataValue: JSON.stringify({ ...dataForSubmit, ...extra, caseCategory }),
        version: { versionNo: new Date().getTime(), userName },
      },
    ],
    syncData,
  };
  if (
    !validateBusinessData({ dataForSubmit, result, optionType, dispatch, caseCategory, taskDefKey })
  ) {
    return requestHandleType.break;
  }
  return result;
};

const assemblePendingDataForSave = async ({
  dataForSubmit,
  optionType,
  taskDetail,
}: IPropsAssemblePeingData) => {
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userName = lodash.get(currentUser, 'userName', '');
  const { taskId, processInstanceId, caseCategory }: any = lodash.pick(taskDetail, [
    'taskId',
    'processInstanceId',
    'caseCategory',
  ]);

  const result = {
    processInstanceId,
    taskId,
    snapshotDataList: [
      {
        taskId,
        optionType,
        dataType: 'mainPage',
        dataValue: JSON.stringify({ ...dataForSubmit }),
        version: { versionNo: new Date().getTime(), userName },
      },
      {
        taskId,
        optionType,
        dataType: 'pending',
        dataValue: JSON.stringify(
          lodash.get(
            await findReasonInfo(
              objectToFormData({
                caseNo: processInstanceId,
                taskId,
              })
            ),
            'resultData',
            {}
          )
        ),
      },
    ],
  };

  if (!validateBusinessData({ dataForSubmit, result, optionType, caseCategory })) {
    return requestHandleType.break;
  }
  return result;
};

const assemblePHCLMDataForSave = ({
  dataForSubmit,
  optionType,
  taskDetail,
  dataType = 'mainPage',
  extra = {},
  dataSchema,
}: any) => {
  if (lodash.isPlainObject(dataSchema)) {
    const validateResult = validator.validate(dataForSubmit, dataSchema);

    const errors = lodash.get(validateResult, 'errors', []);
    // todo: 这里能接日志系统就可以发现一些问题
    // eslint-disable-next-line no-console

    if (errors.length) {
      return requestHandleType.continue;
    }
  }

  return assembleDefaultDataForSave({ dataForSubmit, optionType, taskDetail, dataType, extra });
};

const saveSnashot = async ({ taskDetail, dataType, dataForSubmit, optionType, syncData }: any) => {
  return await assembleDefaultDataForSave({
    taskDetail,
    dataForSubmit,
    optionType,
    dataType,
    syncData,
  }).then(async (saveSnapshotData) => {
    if (saveSnapshotData === requestHandleType.break) {
      return saveSnapshotData;
    }
    const resultSnapshot = (await snapshot(saveSnapshotData)) || {};
    return {
      ...resultSnapshot,
      versionNo: saveSnapshotData?.snapshotDataList?.[0]?.version?.versionNo,
    };
  });
};

const savePendingSnashot = async ({
  taskDetail,
  dataForSubmit,
  optionType,
}: IPropsAssembleDefaultData) => {
  await assemblePendingDataForSave({
    taskDetail,
    dataForSubmit,
    optionType,
  }).then((saveSnapshotData) => {
    return saveSnapshotData === requestHandleType.break
      ? saveSnapshotData
      : {
          ...snapshot(saveSnapshotData),
          versionNo: saveSnapshotData?.snapshotDataList?.[0]?.version?.versionNo,
        };
  });
};

export {
  // 组装默认数据
  assembleDefaultDataForSave,
  // 组装Pending数据
  assemblePendingDataForSave,
  // 组装PHCLM数据
  assemblePHCLMDataForSave,
  // 存储默认snapshot数据
  saveSnashot,
  // 存储Pending snapshot数据
  savePendingSnashot,
};
