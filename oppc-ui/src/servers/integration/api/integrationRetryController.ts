// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/batchRetry */
export async function batchRetry(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/batchRetry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/batchRetryHousekeeping */
export async function batchRetryHousekeeping(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/integration/v2/batchRetryHousekeeping', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/batchSubmitRetry */
export async function batchSubmitRetry(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/batchSubmitRetry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/findBatchSubmitLog */
export async function findBatchSubmitLog(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageIntegrationExceptionBatchSubmitLogDO>(
    '/api/integration/v2/findBatchSubmitLog',
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

/** 此处后端没有提供注释 POST /api/integration/v2/getRetryIntegrationCodeAndStatus */
export async function getRetryIntegrationCodeAndStatus(
  body: API.RetryIntegrationInterfaceQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRetryInterfaceVO>(
    '/api/integration/v2/getRetryIntegrationCodeAndStatus',
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

/** 此处后端没有提供注释 POST /api/integration/v2/getWaitingRetryIntegrationCodeList */
export async function getWaitingRetryIntegrationCodeList(
  body: API.RetryIntegrationInterfaceQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRetryInterfaceVO>(
    '/api/integration/v2/getWaitingRetryIntegrationCodeList',
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

/** 此处后端没有提供注释 POST /api/integration/v2/manualRetryStuckCase */
export async function manualRetryStuckCase(
  body: API.RetryIntegrationInterfaceQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/manualRetryStuckCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/queryRetryStatus */
export async function queryRetryStatus(
  body: API.IntegrationBatchRetryDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/queryRetryStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/retry */
export async function retry(
  body: API.IntegrationBatchRetryDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/retry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/retryAccountBook */
export async function retryAccountBook(options?: { [key: string]: any }) {
  return request<any>('/api/integration/v2/retryAccountBook', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/retryCaseStuckAtAutoActivity */
export async function retryCaseStuckAtAutoActivity(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/retryCaseStuckAtAutoActivity',
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
