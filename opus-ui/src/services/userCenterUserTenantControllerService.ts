
import { stringify } from 'qs';
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/uc/tenant/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteAll(params?: any, option?: any): Promise<any> {
  return request('/api/uc/tenant/deleteAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request(`/api/uc/tenant/get?${stringify(params)}`, {
    ...option,
  });
}

export async function refresh(params?: any, option?: any): Promise<any> {
  return request('/api/uc/tenant/refresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/uc/tenant/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteAll,
  get,
  refresh,
  save,
}
