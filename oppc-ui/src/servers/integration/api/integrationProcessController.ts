// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/process/getAsyncSubmissionRequestData */
export async function getAsyncSubmissionRequestData(
  body: API.IntegrationProcessInquireVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/process/getAsyncSubmissionRequestData',
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

/** 此处后端没有提供注释 POST /api/integration/process/getErrorIntegrationProcess */
export async function getErrorIntegrationProcess(
  body: API.IntegrationProcessInquireVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationProcessDO>(
    '/api/integration/process/getErrorIntegrationProcess',
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
