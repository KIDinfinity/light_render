// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/cache/deleteByPattern */
export async function deleteByPattern(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/registration/cache/deleteByPattern', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/cache/deleteKey */
export async function deleteKey(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/registration/cache/deleteKey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/cache/getKeyByPattern */
export async function getKeyByPattern(
  body: API.RedisPatternQO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringSetObject>(
    '/api/registration/cache/getKeyByPattern',
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
