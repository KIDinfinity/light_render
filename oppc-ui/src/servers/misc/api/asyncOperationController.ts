// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/async/create */
export async function asyncCreate1(
  body: API.CaseCreationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/async/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/async/submit */
export async function asyncSubmit(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/cases/async/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
