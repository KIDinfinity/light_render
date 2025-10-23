
import request from '@/utils/request';

export async function getProcessInstanceProgress(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/processInstance/getProcessInstanceProgress', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getProcessInstanceProgress,
}
