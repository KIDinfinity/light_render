// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/product/loopMigrate */
export async function call1(
  body: API.RequestVOListString,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/pc/product/loopMigrate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
