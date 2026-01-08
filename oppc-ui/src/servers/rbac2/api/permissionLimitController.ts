// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/assignedPermission */
export async function assignedPermission(
  body: API.BusinessActivityPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPermissionLimitResult>(
    '/api/rbac2/permissionLimit/assignedPermission',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/beAssignedPermission */
export async function beAssignedPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.beAssignedPermissionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/rbac2/permissionLimit/beAssignedPermission',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/beManualAssignPermissionLimit */
export async function beManualAssignPermissionLimit(
  body: API.AssignmentVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/rbac2/permissionLimit/beManualAssignPermissionLimit',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/claimActivityPermission */
export async function claimActivityPermission(
  body: API.BusinessActivityPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPermissionLimitResult>(
    '/api/rbac2/permissionLimit/claimActivityPermission',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/findLimitsByRoles */
export async function findLimitByRoles1(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTransactionLimit>(
    '/api/rbac2/permissionLimit/findLimitsByRoles',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/getActivityPermissionLimit */
export async function getActivityPermissionLimit(
  body: API.ActivityPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActivityPermissionLimitVO>(
    '/api/rbac2/permissionLimit/getActivityPermissionLimit',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/getCaseCategoryActivityKeyConfigPermissionLimits */
export async function getCaseCategoryActivityKeyConfigPermissionLimits(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseCategoryActivityKeyConfigPermissionLimitsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPermissionLimitBO>(
    '/api/rbac2/permissionLimit/getCaseCategoryActivityKeyConfigPermissionLimits',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/permissionLimit/getUserPermissionLimits */
export async function getUserPermissionLimits(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPermissionLimitsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPermissionLimitBO>(
    '/api/rbac2/permissionLimit/getUserPermissionLimits',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
