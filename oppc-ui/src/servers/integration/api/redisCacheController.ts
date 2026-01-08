// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/cache/delete */
export async function deleteCache(
  body: API.RedisCacheDeleteQO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/integration/cache/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
