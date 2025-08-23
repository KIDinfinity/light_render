
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/ClaimAppeal/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/ClaimAppeal/getCaseInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
  getCaseInfo,
}
