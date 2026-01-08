// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/getAllPermissionLimitCodeMappingByCurrentRegion */
export async function getAllPermissionLimitCodeMappingByCurrentRegion(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.PermissionLimitCodeMappingDO[]>(
    '/rpc/rbac2/permission/getAllPermissionLimitCodeMappingByCurrentRegion',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/getSubmitSeniorUserForNB */
export async function getSubmitSeniorUserForNb(
  body: API.SeniorUserSubmitPermissionVO,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/permission/getSubmitSeniorUserForNB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/permission/submitValid */
export async function submitValid2(
  body: API.AssignPermissionBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/rbac2/permission/submitValid',
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
