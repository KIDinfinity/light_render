import lodash from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { snapShotSchema } from 'claim/schema/Snapshot';
import { assemblePHCLMDataForSave, assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      // 对接payment allocation
      const dataForSubmit = await dispatch({
        type: 'PHCLMOfClaimAssessmentController/getDataForSubmit',
      });
      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: dataForSubmit,
        },
      });

      const { errors: allocationErrors, output } = backData;
      // 将返回的claim数据同步到主页面

      if (!lodash.isEmpty(output)) {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/savePaymentAllocation',
          payload: output,
        });
      }

      return [...allocationErrors];
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

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });

      const { insured, claimant } = dataForSubmit;
      const variable = {
        ...allveriables[1],
        insuredId: insured?.clientId,
        claimantName: `${claimant?.firstName}_${claimant?.surname}`,
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

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
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
