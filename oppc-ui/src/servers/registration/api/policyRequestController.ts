// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/policy/asyncRequestPolicy */
export async function asyncRequestSrvPolicy(
  body: API.RequestPolicyVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/registration/policy/asyncRequestPolicy',
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

/** 此处后端没有提供注释 POST /api/registration/policy/getAsyncRequestPolicyResult */
export async function getAsyncRequestPolicyResult(
  body: API.RequestAsyncPolicyVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAsyncPolicyResultVO>(
    '/api/registration/policy/getAsyncRequestPolicyResult',
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
