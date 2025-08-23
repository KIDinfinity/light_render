
import { stringify } from 'qs';
import request from '@/utils/request';

export async function add(params?: any, option?: any): Promise<any> {
  return request('/rpc/job/add', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchAdd(params?: any, option?: any): Promise<any> {
  return request('/rpc/job/batchAdd', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request(`/rpc/job/get?${stringify(params)}`, {
    ...option,
  });
}

export async function leftFuzzyQuery(params?: any, option?: any): Promise<any> {
  return request('/rpc/job/leftFuzzyQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/rpc/job/remove', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/rpc/job/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  add,
  batchAdd,
  get,
  leftFuzzyQuery,
  remove,
  update,
}
