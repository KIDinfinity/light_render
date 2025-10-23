
import request from '@/utils/request';

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/claim/cache/benefit/setter/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/claim/cache/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  update,
  remove,
}
