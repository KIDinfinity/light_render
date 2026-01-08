// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/HNWCustomer/triggerJob */
export async function triggerJob1(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ReturnTString>('/api/navigator/HNWCustomer/triggerJob', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/HNWCustomer/updateCase */
export async function updateCase(
  body: API.UpdateCaseC360PolicyInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/HNWCustomer/updateCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
