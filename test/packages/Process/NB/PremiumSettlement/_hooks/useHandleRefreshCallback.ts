import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import TaskStatus from 'process/NB/PremiumSettlement/Enum/taskStatus';
import PremiumProcessType from 'process/NB/PremiumSettlement/Enum/premiumProcessType';
import ProcessStatusType from 'process/NB/PremiumSettlement/Enum/processStatusType';
import useSetProcessStatus from 'process/NB/PremiumSettlement/_hooks/useSetProcessStatus';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { Action } from '@/components/AuditLog/Enum';
import { serialize as objectToFormData } from 'object-to-formdata';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default ({ setLoading, loading }: any) => {
  const processStatus = useSetProcessStatus();
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  let count = 0;
  const interval = 1000 * 5;
  const timeout = 1000 * 60 * 2;

  const refreshTaskStatus = async ({
    taskId,
  }: {
    taskId: string;
  }): Promise<{ success: boolean; taskStatus: any }> => {
    const response = await getTask(
      objectToFormData({
        taskId,
      })
    );
    count = count + 1;
    const taskStatus = lodash.get(response, 'resultData.taskStatus');

    if (taskStatus === TaskStatus.Completed) {
      return {
        success: true,
        taskStatus,
      };
    }
    await delay(interval);
    if (count * interval > timeout) {
      return {
        success: false,
        taskStatus,
      };
    }
    return refreshTaskStatus({ taskId });
  };
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useCallback(async () => {
    if (loading) {
      return false;
    }
    setLoading(true);
    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: processStatus === ProcessStatusType.Error ? Action.Retry : Action.Refresh,
      },
    });
    const { businessNo, caseNo, processInstanceId, taskId } = lodash.pick(taskDetail, [
      'caseNo',
      'businessNo',
      'taskStatus',
      'processInstanceId',
      'taskId',
    ]);
    const result: any = await dispatch({
      type: `${NAMESPACE}/refreshPremium`,
      payload: {
        businessNo,
        caseNo,
      },
    });
    const { success, resultData } = lodash.pick(result, ['success', 'resultData']);
    if (success) {
      const premiumMatch = lodash.get(resultData, 'businessData.policyList[0].premiumMatch');
      if (premiumMatch === PremiumProcessType.Completed) {
        const taskRes = await refreshTaskStatus({ taskId: taskDetail?.taskId });
        const { taskStatus, success: updateTaskStatusSuccess } = lodash.pick(taskRes, [
          'success',
          'taskStatus',
        ]);
        if (!updateTaskStatusSuccess) {
          handleMessageModal([
            {
              code: formatMessageApi({ Label_COM_Message: 'MSG_000684' }),
              content: formatMessageApi({ Label_COM_Message: 'MSG_000684' }),
            },
          ]);
          return false;
        }
        if (taskStatus === TaskStatus.Completed) {
          window.location.reload();
        }
        if (taskStatus !== TaskStatus.Completed) {
          dispatch({
            type: `${NAMESPACE}/saveSnapshot`,
            payload: {
              postData: lodash.get(resultData, 'businessData', {}),
              processInstanceId,
              taskId,
            },
          });
        }
        setLoading(false);
      }
      setLoading(false);
    }
  }, [taskDetail, businessData, setLoading, loading]);
};
