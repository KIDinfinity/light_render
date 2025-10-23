
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/uc/contacts/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByName(params?: any, option?: any): Promise<any> {
  return request('/api/uc/contacts/getByName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
  getByName,
}
