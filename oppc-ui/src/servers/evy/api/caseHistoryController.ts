// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/evy/history/clean */
export async function clean(body: string[], options?: { [key: string]: any }) {
  return request<API.ResultVO>('/rpc/evy/history/clean', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
