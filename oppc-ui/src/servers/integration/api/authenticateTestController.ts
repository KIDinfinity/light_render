// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/test/auth/ad */
export async function testAdAuthentication(
  body: API.AdAuthenticationVO,
  options?: { [key: string]: any },
) {
  return request<API.AdAuthenticationVO>('/api/integration/test/auth/ad', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/test/auth/adMulti */
export async function testAdAuthenticationMulti(
  body: API.AdAuthenticationVO,
  options?: { [key: string]: any },
) {
  return request<API.AdAuthenticationVO>('/api/integration/test/auth/adMulti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
