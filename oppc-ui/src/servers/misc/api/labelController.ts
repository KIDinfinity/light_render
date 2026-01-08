// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/label/getLabelByBusinessNo */
export async function getLabelByBusinessNo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIndicatorVO>(
    '/api/navigator/label/getLabelByBusinessNo',
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
