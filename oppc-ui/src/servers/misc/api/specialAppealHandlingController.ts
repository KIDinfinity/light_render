// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/special/batchHandleAppeal */
export async function batchHandleAppeal(
  body: API.SpecialHandlingAppealParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/special/batchHandleAppeal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
