// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/skipBOError/markPass */
export async function markPass(
  body: API.SkipBoHandlerCaseVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/skipBOError/markPass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
