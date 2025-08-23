import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { Action } from '@/components/AuditLog/Enum';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { taskGoBack } from '@/utils/task';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'bpOfClaimAssessmentController/validateFields',
      });

      // 对接payment allocation
      const dataForSubmit = await dispatch({
        type: 'bpOfClaimAssessmentController/getDataForSubmit',
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
          type: 'bpOfClaimAssessmentController/savePaymentAllocation',
          payload: output,
        });
      }

      return [...errors, ...allocationErrors];
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const { processInstanceId, taskId, taskStatus, taskDefKey } = lodash.pick(taskDetail, [
        'taskId',
        'processInstanceId',
        'taskDefKey',
        'taskStatus',
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
        type: 'bpOfClaimAssessmentController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      return {
        1: dataForBaseInfoParam,
        2: dataForBaseInfoParam,
        3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[2] }),
        4: dataForSave,
        5: dataForBaseInfoParam,
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
        type: 'bpOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
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
        type: 'bpOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
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
};
