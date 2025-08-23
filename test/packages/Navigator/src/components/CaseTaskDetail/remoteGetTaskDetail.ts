import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { ErrorTypeEnum } from '@/enum/ErrorType';

export default async (options: any, signal: any = null) => {
  const { taskId, processInstanceId } = options;
  if (taskId) {
    const taskResponse = await getTask(
      objectToFormData({
        taskId,
      }),
      {
        signal,
      }
    );

    if (
      lodash.isPlainObject(taskResponse) &&
      taskResponse.success &&
      lodash.isPlainObject(taskResponse.resultData)
    ) {
      return taskResponse.resultData;
    }
    // 自动节点使用getTask拿不到taskDetail
    if (processInstanceId && lodash.isNull(taskResponse?.resultData)) {
      const response = await findBizProcess(
        {
          processInstanceId,
        },
        {
          signal,
        }
      );
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response?.resultData)
      ) {
        return lodash
          .chain(response?.resultData)
          .assign({ taskDefKey: response?.resultData?.currentActivityKey })
          .omit('currentActivityKey')
          .value();
      }
    }
  } else if (processInstanceId) {
    const response = await findBizProcess(
      {
        processInstanceId,
      },
      {
        signal,
      }
    );
    const { success, type } = lodash.pick(response, ['success', 'type']);
    if (!success && type === ErrorTypeEnum.DataAuthorityException) {
      return false;
    }

    if (
      lodash.isPlainObject(response) &&
      response.success &&
      lodash.isString(response.resultData?.currentTaskId) &&
      !lodash.isEmpty(response.resultData.currentTaskId)
    ) {
      const taskResponse = await getTask(
        objectToFormData({
          taskId: response.resultData.currentTaskId,
        }),
        {
          signal,
        }
      );

      if (
        lodash.isPlainObject(taskResponse) &&
        taskResponse.success &&
        lodash.isPlainObject(taskResponse.resultData)
      ) {
        return taskResponse.resultData;
      }
    }
  }

  return null;
};
