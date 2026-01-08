// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/opus/log/extendLogConfigTest */
export async function extendLogConfigTest(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapObjectObject>(
    '/api/opus/log/extendLogConfigTest',
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

/** 此处后端没有提供注释 POST /api/opus/log/logTest */
export async function logTest(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/opus/log/logTest', {
    method: 'POST',
    ...(options || {}),
  });
}
