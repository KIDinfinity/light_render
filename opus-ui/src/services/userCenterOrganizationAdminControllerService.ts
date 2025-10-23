
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/organization/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteBatch,
  find,
  insert,
  page,
  update,
}
