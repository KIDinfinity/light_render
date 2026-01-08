// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/log/query */
export async function query2(
  body: API.LogQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/navigator/cases/log/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/log/testLogTaskTrack */
export async function query1(
  body: API.AuditLogVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>(
    '/api/navigator/cases/log/testLogTaskTrack',
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
