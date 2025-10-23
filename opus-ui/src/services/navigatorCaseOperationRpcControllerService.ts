
import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/cases/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/cases/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  submit,
}
