
import request from '@/utils/request';

export async function queryRegionDefaultCurrency(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/currencyConfig/queryRegionDefaultCurrency', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryRegionDefaultCurrencyWrapper(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/currencyConfig/queryRegionDefaultCurrencyWrapper', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryRegionDefaultCurrency,
  queryRegionDefaultCurrencyWrapper,
}
