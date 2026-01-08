// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/removeCaseOverdueJob */
export async function removeCaseOverdueJob(
  body: API.CaseOverdueJobVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/cases/removeCaseOverdueJob',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/triggerCaseOverdueJob */
export async function triggerCaseOverdueJob(
  body: API.CaseOverdueJobVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>(
    '/api/navigator/cases/triggerCaseOverdueJob',
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
