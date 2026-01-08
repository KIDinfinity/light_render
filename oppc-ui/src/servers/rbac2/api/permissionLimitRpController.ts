// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/submitValid */
export async function submitValid1(
  body: API.PermissionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/rbac2/resource/submitValid',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/verifyAuthorityByResourceValues */
export async function verifyDetailAuthority(
  body: API.ResourceValuePermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResourcePermissionLimitResult[]>(
    '/rpc/rbac2/resource/verifyAuthorityByResourceValues',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/verifyHkClaimApprovalSubmit */
export async function verifyHkClaimApprovalSubmit(
  body: API.UserPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/rbac2/resource/verifyHkClaimApprovalSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/verifyMyClaimApprovalSubmit */
export async function verifyMyClaimApprovalSubmit(
  body: API.UserPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/rbac2/resource/verifyMyClaimApprovalSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/verifySubmitAuthority */
export async function verifySubmitAuthority(
  body: API.BusinessActivityPermissionLimitVO,
  options?: { [key: string]: any },
) {
  return request<API.ValidatedResultVO>(
    '/rpc/rbac2/resource/verifySubmitAuthority',
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
