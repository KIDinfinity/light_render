import { save } from '@/services/ccJpDataControllerService';
import { save as userSave } from '@/services/ccCombineDataControllerService';
import { startSyncProcessInstance } from '@/services/bpmProcessInstanceService';
import { findAddTaskId } from '@/services/ccTaskControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import { OperationType } from 'configuration/pages/ConfigurationCenter/Enum';
import { Operation, FunctionCode } from 'configuration/pages/NavigatorConfiguration/Enum';
import { Mode } from 'configuration/constant';
import { notification } from 'antd';
import TimeUtil from '@/utils/time';
import delay from '@/utils/delay';
import { combineDataDtl } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import getCaseCategory from '../config/getCaseCategory';

export default [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { put, call, select }: any) {
    yield call(delay, 500);
    const { rows = [], type, tag } = payload;
    const {
      userId,
      functionId,
      previewModal,
      functionCode,
      previewRecord,
      currentMenu,
    } = yield select((state: any) => ({
      userId: state.user.currentUser?.userId,
      functionId: state.configurationController?.currentMenu?.id,
      previewModal: state.configurationController?.previewModal,
      functionCode: state.configurationController?.functionData?.functionCode,
      previewRecord: state.configurationController?.previewRecord, // User的preview弹窗获取的数据
      currentMenu: state.configurationController?.currentMenu,
    }));
    if (type === Operation.Add) {
      const res = yield call(
        findAddTaskId,
        objectToFormData({
          functionId,
        })
      );

      if (
        lodash.isPlainObject(res) &&
        res.success &&
        lodash.isPlainObject(res.resultData) &&
        res.resultData.taskId
      ) {
        const {
          resultData: { taskId },
        } = res;
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
            isPreview: previewModal,
          },
        });
        if (tag === 'onCopy') {
          const mapFuncCodeToType = {
            [FunctionCode.Fun_venus_uc_user_general_information]:
              'configureUserController/getPreview',
            [FunctionCode.Fun_venus_rbac_rbac_group]: 'configureUserGroupController/getPreview',
            [FunctionCode.Fun_venus_rbac_rbac_role]: 'configureRoleController/getPreview',
          };
          yield put({
            type: mapFuncCodeToType[functionCode],
            payload: {
              previewRecord,
            },
          });
        }
        return;
      }
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
      let saveResponse = {};
      // Authority Management
      if (
        lodash.includes(
          [
            FunctionCode.Fun_venus_uc_user_general_information,
            FunctionCode.Fun_venus_rbac_rbac_group,
            FunctionCode.Fun_venus_rbac_rbac_role,
          ],
          functionCode
        )
      ) {
        let list = [];
        if (type !== Operation.Add) {
          const mapFuncCodeToFieldName = {
            [FunctionCode.Fun_venus_uc_user_general_information]: 'user_id',
            [FunctionCode.Fun_venus_rbac_rbac_group]: 'group_code',
            [FunctionCode.Fun_venus_rbac_rbac_role]: 'role_code',
          };
          const firstFieldValue = lodash
            .map(rows, (item) => item[mapFuncCodeToFieldName[functionCode]])
            .join(',');

          const combineResponse = yield call(combineDataDtl, {
            functionId: currentMenu?.id,
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
          list = combineResponse?.resultData;
        }
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
        saveResponse = yield call(userSave, {
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
      } else {
        saveResponse = yield call(save, {
          functionId,
          records: lodash.map(rows, (el: any) => ({
            ...el,
            '#operation': OperationType.update,
          })),
          pageTemplateType: type,
          caseNo: processInstanceId,
          taskId,
        });
      }
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
        const errorMessage =
          saveResponse?.promptMessages?.[0]?.content || saveResponse?.promptMessages?.[0]?.type;
        notification.error({ message: errorMessage });
      }
    }
  },
  { type: 'takeLatest' },
];
