// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/van/cancel */
export async function cancelSrvCase(
  body: API.CaseSubmitVOOwbRegVanCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/van/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/van/submit */
export async function submit1(
  body: API.CaseSubmitVOOwbRegVanCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOObject>(
    '/api/registration/van/submit',
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
