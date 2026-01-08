// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/generateNo */
export async function generateNo(
  body: API.GenerateNoRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/navigator/cases/generateNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
