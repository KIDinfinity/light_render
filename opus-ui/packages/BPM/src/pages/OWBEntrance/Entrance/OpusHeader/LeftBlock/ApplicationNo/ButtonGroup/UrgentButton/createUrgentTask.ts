import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { toggleUrgent } from '@/services/bpmBusinessProcessService';

/**
 * 获取favorite 的初始状态
 * @param {String} object.userId
 * @param {String} object.taskId
 * @return {Number} 1/0
 */
export default async ({ processInstanceId, urgent }: any) => {
  const response = await toggleUrgent(objectToFormData({ processInstanceId, urgent }));
  if (lodash.get(response, 'success')) {
    return true;
  }
  return false;
};
