// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/ud/create/wakeUpCreate */
export async function wakeUpCreate(
  body: API.CaseSubmitVOUdCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmitCaseResultVOObject>(
    '/api/registration/ud/create/wakeUpCreate',
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
