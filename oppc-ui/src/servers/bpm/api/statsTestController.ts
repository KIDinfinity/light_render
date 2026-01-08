// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/stats/push */
export async function push(body: Record, options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/stats/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/stats/test */
export async function test1(
  body: API.StatsCaseEvent,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/stats/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
