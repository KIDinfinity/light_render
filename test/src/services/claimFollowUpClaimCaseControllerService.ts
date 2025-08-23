
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/follow/up/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
}
