import { taskGoBack } from '@/utils/task';
import lodash from 'lodash';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { Action } from '@/components/AuditLog/Enum';
import { NAMESPACE } from './activity.config';

export default {
  submit: {
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  reject: {
    action: async ({ taskDetail }: any) => {
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

      return {
        1: dataForBaseInfoParam,
      };
    },
    after: async ({ dispatch }: any) => {
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
