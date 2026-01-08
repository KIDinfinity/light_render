// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/doc/findBase64Content */
export async function findBase64Content(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/integration/doc/findBase64Content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/doc/findDocData */
export async function findDocData(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.IntegrationDocDataDO>('/rpc/integration/doc/findDocData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
