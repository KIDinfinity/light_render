// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/srv/permission/submitValid */
export async function submitValid(
  body: API.PosPermissionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/rbac2/srv/permission/submitValid',
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
