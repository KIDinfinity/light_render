
import request from '@/utils/request';

export async function advancedQuery(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/advancedQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllUser(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findAllUser', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByRoleCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findByRoleCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLanguageByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findLanguageByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserOrderByEmploymentDate(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findUserOrderByEmploymentDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQuery,
  findAllUser,
  findByRoleCode,
  findByUserId,
  findLanguageByUserId,
  findUserOrderByEmploymentDate,
}
