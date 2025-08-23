import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { NAMESPACE } from './activity.config';
import { taskGoBack } from '@/utils/task';

export default {
  approve: {
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
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
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: { isSave: false },
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({
          taskDetail,
          dataForSubmit: dataForSubmit,
          variables: allveriables[1],
          operationType: EOptionType.Approve,
        }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  decline: {
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
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
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: { isSave: false },
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({
          taskDetail,
          dataForSubmit: dataForSubmit,
          variables: allveriables[1],
          operationType: EOptionType.Decline,
        }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      return [];
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      return {
        1: getSubmitData({
          taskDetail,
          dataForSubmit: {
            mainPolicyId: dataForSubmit?.mainPolicyId,
          },
          variables: allveriables[1],
        }),
        2: getSubmitData({
          taskDetail,
          dataForSubmit: dataForSubmit,
          variables: allveriables[1],
        }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  withdraw: {
    hidden: ({ taskDetail }: any) => {
      return;
    },
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
      };
    },
  },
  ews: {
    isShowNotice: false,
    action: async ({ dispatch, taskDetail }: any) => {
      const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
        'businessNo',
        'processInstanceId',
      ]);
      const { success, businessNo: newBusinessNo } = await dispatch({
        type: `${NAMESPACE}/ewsGetBusinessNo`,
        payload: {
          businessNo,
        },
      });

      if (success && newBusinessNo && processInstanceId) {
        window.open(`/servicing/ews/${newBusinessNo}/${processInstanceId}`, '_blank');
      }
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, isAuto }: any) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
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
    action: async ({ taskDetail, dispatch }: any) => {
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
        type: `${NAMESPACE}/getDataForSubmit`,
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
    after: async () => {
      // taskGoBack();
    },
  },
};
