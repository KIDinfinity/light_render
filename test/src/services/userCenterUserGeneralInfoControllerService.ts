
import { stringify } from 'qs';
import request from '@/utils/request';

export async function addFundPoint(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/addFundPoint', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllForAssigneeUser(params?: any, option?: any): Promise<any> {
  return request(`/api/uc/userGeneralInfo/findAllForAssigneeUser?${stringify(params)}`, {
    ...option,
  });
}

export async function findAllTitle(params?: any, option?: any): Promise<any> {
  return request(`/api/uc/userGeneralInfo/findAllTitle?${stringify(params)}`, {
    ...option,
  });
}

export async function findAllUser(params?: any, option?: any): Promise<any> {
  return request(`/api/uc/userGeneralInfo/findAllUser?${stringify(params)}`, {
    ...option,
  });
}

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserIdList(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/findByUserIdList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserOrderByEmploymentDate(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/findUserOrderByEmploymentDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/queryByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function subtractFundPoint(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/subtractFundPoint', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userGeneralInfo/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addFundPoint,
  remove,
  deleteBatch,
  find,
  findAllForAssigneeUser,
  findAllTitle,
  findAllUser,
  findByUserId,
  findByUserIdList,
  findUserOrderByEmploymentDate,
  insert,
  page,
  queryByUserId,
  subtractFundPoint,
  update,
}
