// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/thirdpartyauth/ad */
export async function adAuthentication(
  body: API.AdAuthenticationVO,
  options?: { [key: string]: any },
) {
  return request<API.AdAuthenticationVO>('/rpc/integration/thirdpartyauth/ad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/thirdpartyauth/adMulti */
export async function adMulti(
  body: API.AdAuthenticationVO,
  options?: { [key: string]: any },
) {
  return request<API.AdAuthenticationVO>(
    '/rpc/integration/thirdpartyauth/adMulti',
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
