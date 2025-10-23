import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import TaskStatus from 'opus/NewBusiness/PremiumSettlement/Enum/taskStatus';
import PremiumProcessType from 'opus/NewBusiness/PremiumSettlement/Enum/premiumProcessType';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default () => {
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

  return useCallback(
    async (resultData: any) => {
      const { processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskStatus',
        'processInstanceId',
        'taskId',
      ]);

      const policyList = lodash.get(resultData, 'businessData.policyList[0]');
      const premiumMatch = lodash.get(resultData, 'businessData.policyList[0].premiumMatch');

      dispatch({
        type: `${NAMESPACE}/savePremiumData`,
        payload: {
          premiumData: policyList,
        },
      });

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
        } else {
          dispatch({
            type: `${NAMESPACE}/saveSnapshot`,
            payload: {
              postData: lodash.get(resultData, 'businessData', {}),
              processInstanceId,
              taskId,
            },
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [taskDetail, businessData]
  );
};
