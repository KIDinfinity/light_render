
import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/pa/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/pa/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/pa/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  get,
  submit,
}
