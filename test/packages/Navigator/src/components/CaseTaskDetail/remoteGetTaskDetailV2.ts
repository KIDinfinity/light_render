import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { ErrorTypeEnum } from '@/enum/ErrorType';

interface TaskOptions {
  taskId?: string;
  processInstanceId?: string;
}

export default async function remoteGetTaskDetail(
  options: TaskOptions,
  signal: AbortSignal | null = null
) {
  const { taskId, processInstanceId } = options;

  if (taskId) {
    const taskResponse = await getTask(objectToFormData({ taskId }), { signal });

    if (isValidResponse(taskResponse)) {
      return taskResponse.resultData;
    }

    if (processInstanceId && lodash.isNull(taskResponse?.resultData)) {
      const response = await findBizProcess({ processInstanceId }, { signal });
      if (isValidResponse(response)) {
        return lodash
          .chain(response?.resultData)
          .assign({ taskDefKey: response?.resultData?.currentActivityKey })
          .omit('currentActivityKey')
          .value();
      }
    }
  }

  if (processInstanceId) {
    return await handleProcessInstance(processInstanceId, signal);
  }

  return null;
}

function isValidResponse(response: any): boolean {
  return (
    lodash.isPlainObject(response) && response.success && lodash.isPlainObject(response.resultData)
  );
}

async function handleProcessInstance(processInstanceId: string, signal: AbortSignal | null) {
  const response = await findBizProcess({ processInstanceId }, { signal });

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
      objectToFormData({ taskId: response.resultData.currentTaskId }),
      { signal }
    );

    if (isValidResponse(taskResponse)) {
      return taskResponse.resultData;
    }
  }

  if (isValidResponse(response)) {
    return {};
  }

  return null;
}
