// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/docInfo/checkBeforeSubmit */
export async function checkBeforeSubmit1(
  body: API.DocInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/docInfo/checkBeforeSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/docInfo/receiveDoc */
export async function receiveDoc(
  body: API.DocInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/navigator/docInfo/receiveDoc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
