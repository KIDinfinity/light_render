
import request from '@/utils/request';

export async function getAll(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/getAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDefaultRegionCurrency(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/getDefaultRegionCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExchangeRateByCurrency(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/getExchangeRateByCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLatestExchangeRate(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/getLatestExchangeRate', {
    ...option,
    method: 'POST',
    body:params,
  })
}

export async function getExchangeRateList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/getExchangeRateList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insertBatchExchangeRate(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/insertBatchExchangeRate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listExchangeRateByEffectiveDate(params?: any, option?: any): Promise<any> {
  return request('/api/misc/exchangeRate/listExchangeRateByEffectiveDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAll,
  getDefaultRegionCurrency,
  getExchangeRateByCurrency,
  getExchangeRateList,
  insertBatchExchangeRate,
  listExchangeRateByEffectiveDate,
  getLatestExchangeRate
}
