
import request from '@/utils/request';

export async function findGroupByUserIdList(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/group/findGroupByUserIdList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findGroupProcessByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/group/findGroupProcessByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findRoleGroupByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/group/findRoleGroupByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findGroupByUserIdList,
  findGroupProcessByUserId,
  findRoleGroupByUserId,
}
