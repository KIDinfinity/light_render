import request from '@/utils/request';

export async function assignedPermission(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/assignedPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function beManualAssignPermissionLimit(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/beManualAssignPermissionLimit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function beAssignedPermission(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/beAssignedPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function claimActivityPermission(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/claimActivityPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLimitsByRoles(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/findLimitsByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseCategoryActivityKeyConfigPermissionLimits(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/rbac2/permissionLimit/getCaseCategoryActivityKeyConfigPermissionLimits', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUserPermissionLimits(params?: any, option?: any): Promise<any> {
  return request('/api/rbac2/permissionLimit/getUserPermissionLimits', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  assignedPermission,
  beAssignedPermission,
  claimActivityPermission,
  findLimitsByRoles,
  getCaseCategoryActivityKeyConfigPermissionLimits,
  getUserPermissionLimits,
  beManualAssignPermissionLimit,
};
