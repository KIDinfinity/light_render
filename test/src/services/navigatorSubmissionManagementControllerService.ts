
import request from '@/utils/request';

export async function receiveData(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/submission/receiveData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  receiveData,
}
