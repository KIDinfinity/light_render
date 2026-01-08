// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/memoryCache/admin/clearCacheList */
export async function clearCacheList2(
  body: API.MemoryCacheAdminVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/rbac2/memoryCache/admin/clearCacheList',
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
