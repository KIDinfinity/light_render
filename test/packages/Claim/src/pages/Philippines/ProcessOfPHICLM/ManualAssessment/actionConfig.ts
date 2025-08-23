import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EOptionType } from 'basic/enum/EOptionType';
import { Action } from '@/components/AuditLog/Enum';
import { messageModal } from '@/utils/commonMessage';
import { taskGoBack } from '@/utils/task';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { snapShotSchema } from 'claim/schema/Snapshot';
import { assemblePHCLMDataForSave } from 'basic/utils/SnapshotTool';
import { wholeEntities } from './_models/dto/EntriesModel';

export default {
  submit: {
    checkInformationBefore: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });
      const skipIntegration = lodash.get(dataForSubmit, 'skipIntegration');
      return skipIntegration === 1;
    },
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });

      const errors: any = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/validateFields',
      });

      // 对接payment allocation
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const incidentList = lodash.get(dataForSubmit, 'incidentList');
      const isOne = lodash.every(
        incidentList,
        (item) => lodash.size(formUtils.queryValue(item?.claimTypeArray)) === 1
      );
      if (!isOne) {
        messageModal({
          typeCode: 'Label_COM_ErrorMessage',
          dictCode: 'MSG_000388',
          code: 'VLD_000370',
        });
        return requestHandleType.break;
      }

      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: dataForSubmit,
        },
      });

      const { errors: allocationErrors, output } = backData;
      // 存在错误项则将返回的claim数据同步到主页面
      if (!lodash.isEmpty(output)) {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/savePaymentAllocation',
          payload: output,
        });
      }
      const errorMessage = [...errors, ...allocationErrors];
      // if (!lodash.size(errorMessage)) {
      //   const validatePassed = await dispatch({
      //     type: 'PHCLMOfClaimAssessmentController/validateRegisterPolices',
      //   });
      //   if (!validatePassed) return requestHandleType.break;
      // }

      return errorMessage;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assemblePHCLMDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit,
        dataSchema: snapShotSchema,
      });

      const { insured, claimant } = dataForSubmit;
      const variable = {
        ...allveriables[1],
        insuredId: insured?.insuredId,
        claimantName: `${claimant?.firstName}_${claimant?.middleName}_${claimant?.surname}`,
      };
      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: variable }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
    anyway: ({ dispatch, responseCollect }: any) => {
      const success = lodash.get(responseCollect, '2.success');
      if (!success) {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/checkPayableRegisted',
        });
      }
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assemblePHCLMDataForSave({
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        taskDetail,
        dataForSubmit,
        dataSchema: snapShotSchema,
      });

      return {
        1: dataForSave,
      };
    },
  },
  reject: {
    action: async ({ taskDetail, dispatch }) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assemblePHCLMDataForSave({
        optionType: EOptionType.Reject,
        taskDetail,
        dataForSubmit,
        dataSchema: snapShotSchema,
      });

      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
    after: async ({ dispatch }) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  image: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });
      await dispatch({
        type: 'PHCLMOfClaimAssessmentController/updateMandatoryDoc',
        payload: getSubmitData({ taskDetail, dataForSubmit, variables: null }),
      });
    },
  },
};
