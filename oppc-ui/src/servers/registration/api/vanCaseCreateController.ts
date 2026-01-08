// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/van/manualCreate */
export async function manualCreateSrvCase(
  body: API.CaseSubmitVOOwbRegVanCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOObject>(
    '/api/registration/van/manualCreate',
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
