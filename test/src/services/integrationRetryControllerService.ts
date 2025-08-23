import request from '@/utils/request';

export async function batchRetry(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/batchRetry`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchRetryHousekeeping(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/batchRetryHousekeeping`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchSubmitRetry(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/batchSubmitRetry`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBatchSubmitLog(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/findBatchSubmitLog`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRetryIntegrationCodeAndStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/getRetryIntegrationCodeAndStatus`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getWaitingRetryIntegrationCodeList(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/getWaitingRetryIntegrationCodeList`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRetryStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/queryRetryStatus`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retry(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/retry`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryAccountBook(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/retryAccountBook`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retryCaseStuckAtAutoActivity(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/v2/retryCaseStuckAtAutoActivity`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchRetry,
  batchRetryHousekeeping,
  batchSubmitRetry,
  findBatchSubmitLog,
  getRetryIntegrationCodeAndStatus,
  getWaitingRetryIntegrationCodeList,
  queryRetryStatus,
  retry,
  retryAccountBook,
  retryCaseStuckAtAutoActivity,
};
