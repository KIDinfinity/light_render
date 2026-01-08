// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/permission/categoryPermissionCheck */
export async function categoryPermissionCheck(
  body: API.CheckPermissionContextVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCategoryPermissionResultVO>(
    '/api/rbac2/permission/categoryPermissionCheck',
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
