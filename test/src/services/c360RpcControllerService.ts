
import request from '@/utils/request';

export async function initPolicyFrom(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/create/initPolicyFrom', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/getByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  initPolicyFrom,
  getByBusinessNo,
}
