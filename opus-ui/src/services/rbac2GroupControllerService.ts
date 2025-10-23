
import request from '@/utils/request';

export async function findAllGroup(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/group/findAllGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findGroupByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/group/findGroupByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserGroupInformationByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/group/findUserGroupInformationByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveUserGroup(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/group/saveUserGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllGroup,
  findGroupByUserId,
  findUserGroupInformationByUserId,
  saveUserGroup,
}
