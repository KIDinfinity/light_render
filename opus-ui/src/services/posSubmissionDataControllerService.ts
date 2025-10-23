
import request from '@/utils/request';

export async function saveData(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/submission/saveData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  saveData,
}
