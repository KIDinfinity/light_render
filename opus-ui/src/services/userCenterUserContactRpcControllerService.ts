
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/contacts/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAll(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/contacts/getAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
  getAll,
}
