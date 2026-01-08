// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/user/advancedQueryRich */
export async function advancedQueryRich(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserInfoVO>(
    '/api/navigator/user/advancedQueryRich',
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
