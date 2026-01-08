// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/dropdown/search */
export async function dropdown(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageDropdownResult>(
    '/api/navigator/dropdown/search',
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
