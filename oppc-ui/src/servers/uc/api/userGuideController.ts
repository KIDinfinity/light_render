// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/guide/reset */
export async function reset(
  body: API.CustomizationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/guide/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/guide/updateInfo */
export async function update3(
  body: API.CustomizationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/guide/updateInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
