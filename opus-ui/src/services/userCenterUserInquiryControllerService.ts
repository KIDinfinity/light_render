import request from '@/utils/request';

export async function advancedQuery(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userInquiry/advancedQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function fuzzyQuery(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userInquiry/fuzzyQuery', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listByRoleCode(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userInquiry/listByRoleCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findProcessRelationshipSideBar(params?: any, option?: any): Promise<any> {
  return request('/api/dw/relationship/inquiry/findProcessRelationshipSideBar', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getReassignableUsers(params?: any, option?: any): Promise<any> {
  return request('/api/dw/reassign/getReassignableUsers', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUncompletedByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/dw/reassign/findUncompletedByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQuery,
  fuzzyQuery,
  listByRoleCode,
  findProcessRelationshipSideBar,
  getReassignableUsers,
  findUncompletedByUserId,
};
