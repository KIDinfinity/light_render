
import request from '@/utils/request';

export async function findAllUserIdByRoleCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/role/findAllUserIdByRoleCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listRoleCodesByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/role/listRoleCodesByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mapListGroupNamesByUserIds(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/role/mapListGroupNamesByUserIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mapListRoleNamesByUserIds(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/role/mapListRoleNamesByUserIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllUserIdByRoleCode,
  listRoleCodesByUserId,
  mapListGroupNamesByUserIds,
  mapListRoleNamesByUserIds,
}
