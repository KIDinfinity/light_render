import lodash from 'lodash';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

export default async (processInstanceId: any, dispatch?: Function) => {
  if (!processInstanceId) return;
  const response = await findBizProcess({
    processInstanceId,
  });

  if (lodash.isPlainObject(response) && response.success && dispatch) {
    dispatch({
      type: 'workspaceSwitchOn/saveRemoteTaskDetail',
      payload: {
        taskDetail: response.resultData,
      },
    });
  }

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isString(response.resultData?.currentTaskId) &&
    !lodash.isEmpty(response.resultData.currentTaskId)
  ) {
    return response.resultData.currentTaskId || '';
  }

  return null;
};
