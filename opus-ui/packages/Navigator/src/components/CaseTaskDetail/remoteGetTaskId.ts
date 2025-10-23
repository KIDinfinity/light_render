import lodash from 'lodash';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

export default async (processInstanceId: any) => {
  if(!processInstanceId)
    return;
  const response = await findBizProcess({
    processInstanceId,
  });

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
