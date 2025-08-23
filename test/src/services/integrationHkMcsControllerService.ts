
import request from '@/utils/request';

export async function getCustomerInfo(params?: any, option?: any): Promise<any> {
  return request('/api/integration/mcs/getCustomerInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMcsClaims(params?: any, option?: any): Promise<any> {
  return request('/api/integration/mcs/getMcsClaims', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCustomerInfo,
  getMcsClaims,
}
