// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/dailyBatchJob/asyncCleanIntegrationProcessTaskJobHandler */
export async function asyncCleanIntegrationProcessTaskJobHandler(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/dailyBatchJob/asyncCleanIntegrationProcessTaskJobHandler',
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

/** 此处后端没有提供注释 POST /api/integration/dailyBatchJob/cleanAsyncSubmissionData */
export async function cleanAsyncSubmissionData(
  body: API.CleanAsyncSubmissionDataParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/dailyBatchJob/cleanAsyncSubmissionData',
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

/** 此处后端没有提供注释 POST /api/integration/dailyBatchJob/cleanDocDataTask */
export async function cleanDocDataTask(
  body: API.IntegrationCleanDataParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/dailyBatchJob/cleanDocDataTask',
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

/** 此处后端没有提供注释 POST /api/integration/dailyBatchJob/cleanDocDataTaskV2 */
export async function cleanDocDataTaskV2(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/dailyBatchJob/cleanDocDataTaskV2',
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

/** 此处后端没有提供注释 POST /api/integration/dailyBatchJob/start */
export async function dailyBatchJob(
  body: API.DailyBatchJobVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/integration/dailyBatchJob/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
