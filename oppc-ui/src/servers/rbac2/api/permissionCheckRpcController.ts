// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/batchAssignedPermission */
export async function batchAssignedPermission(
  body: API.BatchAssignPermssionVO,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/permission/batchAssignedPermission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/validateBatchBeAssignPermission */
export async function validateBatchBeAssignPermission(
  body: API.BatchAssignRbacPermissionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringObject>(
    '/rpc/rbac2/permission/validateBatchBeAssignPermission',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/validateBeManualAssignPermissionLimit */
export async function validateBeManualAssignPermissionLimit(
  body: API.AssignmentVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/rbac2/permission/validateBeManualAssignPermissionLimit',
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
