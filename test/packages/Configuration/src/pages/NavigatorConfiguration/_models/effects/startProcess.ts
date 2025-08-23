import { save as userSave, findSelfModifyingTask } from '@/services/ccCombineDataControllerService';
import { startSyncProcessInstance } from '@/services/bpmProcessInstanceService';
import lodash from 'lodash';
import { OperationType } from 'configuration/pages/ConfigurationCenter/Enum';
import { Operation, FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import { Mode } from 'configuration/constant';
import { notification } from 'antd';
import TimeUtil from '@/utils/time';
import delay from '@/utils/delay';
import { combineDataDtl } from '@/services/ccCombineDataControllerService';
import getCaseCategory from '../config/getCaseCategory';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { put, call, select }: any) {
    yield call(delay, 500);
    const { userId, previewModal, menuTemp, previewRecord } = yield select((state: any) => ({
      userId: state.user.currentUser?.userId,
      previewModal: state.configurationController?.previewModal,
      previewRecord: state.configurationController?.previewRecord, // User的preview弹窗获取的数据
      menuTemp: state.configurationController?.menuTemp,
    }));
    const { functionCode, rows = [], type = Operation.Update } = payload;
    // 获取到Association FunctionId
    const functionId = menuTemp.find((item: any) => item?.functionCode === functionCode)?.id;
    const mapFuncCodeToFieldName = {
      [FunctionCode.Fun_venus_uc_user_general_information]: 'user_id',
      [FunctionCode.Fun_venus_rbac_rbac_group]: 'group_code',
      [FunctionCode.Fun_venus_rbac_rbac_role]: 'role_code',
    };
    const firstFieldValue = lodash
      .map(rows, (item) => item[mapFuncCodeToFieldName[functionCode]])
      .join(',');

    const combineResponse = yield call(combineDataDtl, {
      functionId,
      caseNo: previewRecord?.case_no,
      imageId: previewRecord?.image_id,
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      whereConditions: [
        {
          fieldName: mapFuncCodeToFieldName[functionCode],
          firstFieldValue,
          whereOperator: WhereOperator.in,
        },
      ],
    });
    const list = combineResponse?.resultData;
    const tableList = lodash.map(list, (item) => {
      return {
        ...item,
        subSection: [
          ...lodash.map(item.subSection, (subItem) => {
            return { ...subItem, subSection: null };
          }),
        ],
      };
    });
    // 根据taskId找到当前task 是否有正在进行的process

    const res = yield call(findSelfModifyingTask, {
      functionId,
      records: lodash.map(tableList, (el: any) => ({
        ...el,
        data: {
          ...el?.data,
          '#operation': OperationType.update,
        },
        '#operation': OperationType.update,
      })),
    });

    if (lodash.isPlainObject(res) && res.success && res.resultData?.[0]?.cc_task_id) {
      const cc_task_id = res.resultData?.[0]?.cc_task_id;
      yield put({
        type: 'saveMode',
        payload: {
          mode: Mode.Expansion,
        },
      });
      yield put({
        type: 'hidePreviewModal',
      });
      yield put({
        type: 'showModal',
        payload: {
          modalTaskId: cc_task_id,
          isPreview: previewModal,
        },
      });
      return;
    } else if (res?.promptMessages && !res?.success) {
      const errorMessage = res?.promptMessages?.[0]?.content;
      if (errorMessage) {
        notification.error({ message: errorMessage });
      }
      return;
    }

    const response = yield call(startSyncProcessInstance, {
      caseCategory: getCaseCategory(functionCode),
      variables: {
        applicant: userId,
        submissionDate: TimeUtil.formatWithTimeZone({
          time: new Date(),
          format: 'YYYY-MM-DDTHH:mm:ss.000',
        }),
      },
    });
    if (!response?.success) {
      const errorMessage = response?.promptMessages?.[0]?.content;
      if (errorMessage) {
        notification.error({ message: errorMessage });
      }
      return;
    }
    const { taskId, processInstanceId } = response?.resultData;
    if (response?.success && processInstanceId) {
      const saveResponse = yield call(userSave, {
        functionId,
        records: lodash.map(tableList, (el: any) => ({
          ...el,
          data: {
            ...el?.data,
            '#operation': OperationType.update,
          },
          '#operation': OperationType.update,
        })),
        pageTemplateType: type,
        caseNo: processInstanceId,
        taskId,
      });

      if (saveResponse?.success) {
        yield put({
          type: 'saveMode',
          payload: {
            mode: Mode.Expansion,
          },
        });
        yield put({
          type: 'hidePreviewModal',
        });
        yield put({
          type: 'showModal',
          payload: {
            modalTaskId: taskId,
            isPreview: type === Operation.Add && previewModal,
          },
        });
      } else {
        const errorMessage = saveResponse?.promptMessages?.[0]?.content;
        if (errorMessage) {
          notification.error({ message: errorMessage });
        }
      }
    }
  },
  { type: 'takeLatest' },
];
