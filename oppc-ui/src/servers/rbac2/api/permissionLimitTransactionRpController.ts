// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/permissionLimitTransaction/grantedAuthorityToUser */
export async function grantedAuthorityToUser(
  body: API.LimitTransactionRequestVO,
  options?: { [key: string]: any },
) {
  return request<any>(
    '/rpc/rbac2/permissionLimitTransaction/grantedAuthorityToUser',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/permissionLimitTransaction/savePermissionLimitTransaction */
export async function savePermissionLimit(
  body: API.LimitTransactionRequestVO,
  options?: { [key: string]: any },
) {
  return request<any>(
    '/rpc/rbac2/permissionLimitTransaction/savePermissionLimitTransaction',
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
