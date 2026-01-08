// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/pend/th/getThPendPolicyReasons */
export async function getThPendPolicyReasons(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListThPendPolicyReasonVO>(
    '/api/bpm/pend/th/getThPendPolicyReasons',
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
