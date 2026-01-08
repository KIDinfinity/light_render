// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/user/security/getPassword */
export async function getPassword1(
  body: API.UserSecurityVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringString>(
    '/api/uc/user/security/getPassword',
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

/** 此处后端没有提供注释 POST /api/uc/user/security/initAllUserPassword */
export async function initAllUserPassword(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>(
    '/api/uc/user/security/initAllUserPassword',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/user/security/updatePassword */
export async function updatePassword(
  body: API.UserSecurityVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/user/security/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
