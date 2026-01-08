// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/createTempTxtFilePoc */
export async function createTempTxtFilePoc(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/rpc/integration/createTempTxtFilePoc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/downloadIntegrationProcess */
export async function downloadIntegrationProcess(
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/integration/downloadIntegrationProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/loadIntegrationProcess */
export async function loadIntegrationProcess(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/rpc/integration/loadIntegrationProcess',
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
