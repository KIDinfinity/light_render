// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/manual/workflow/confirm */
export async function confirm(
  body: API.WorkflowConfirmVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/manual/workflow/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/manual/workflow/pushActivity */
export async function pushActivity(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/manual/workflow/pushActivity',
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
