
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findById(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/findById', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserIdList(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/findByUserIdList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/management/uc/userGeneralInfo/update', {
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
  findByUserIdList,
  insert,
  page,
  update,
}
