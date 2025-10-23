import request from '@/utils/request';

export async function asyncStart(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/asyncStart', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function businessCaseSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/businessCaseSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function start(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/start', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateExchangeRate(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/updateExchangeRate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBatchSubmitLog(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/findBatchSubmitLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchSubmitRetry(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/batchSubmitRetry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asyncStart,
  businessCaseSubmit,
  start,
  updateExchangeRate,
  findBatchSubmitLog,
  batchSubmitRetry,
};
