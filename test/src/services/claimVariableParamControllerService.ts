
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/variableStatus/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/variableStatus/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
  update,
}
