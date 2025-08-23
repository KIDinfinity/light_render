import request from '@/utils/request';

export async function queryRegionCurrency(params?: any, option?: any): Promise<any> {
  return request('/api/misc/currencyConfig/queryRegionCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRegionDefaultCurrency(params?: any, option?: any): Promise<any> {
  return request('/api/misc/currencyConfig/queryRegionDefaultCurrency', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryRegionCurrency,
  queryRegionDefaultCurrency,
};
