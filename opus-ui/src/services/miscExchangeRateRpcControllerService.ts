
import request from '@/utils/request';

export async function compareCurrency(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/exchangeRate/compareCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatestEffectiveExchangeByCurrency(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/exchangeRate/findLatestEffectiveExchangeByCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatestExchangeByCurrency(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/exchangeRate/findLatestExchangeByCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrency(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/exchangeRate/getCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insertExchangeRate(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/exchangeRate/insertExchangeRate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  compareCurrency,
  findLatestEffectiveExchangeByCurrency,
  findLatestExchangeByCurrency,
  getCurrency,
  insertExchangeRate,
}
