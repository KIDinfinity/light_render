
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findById(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/findById', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userPersonalInfo/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteBatch,
  findById,
  findByUserId,
  insert,
  page,
  update,
}
