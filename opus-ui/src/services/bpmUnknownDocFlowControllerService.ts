
import { stringify } from 'qs';
import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/unknown/doc/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function find(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/unknown/doc/find?${stringify(params)}`, {
    ...option,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/unknown/doc/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  find,
  submit,
}
