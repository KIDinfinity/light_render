// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/externalCaseOperation/cancel */
export async function create(
  body: API.CancelCaseRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/navigator/externalCaseOperation/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
