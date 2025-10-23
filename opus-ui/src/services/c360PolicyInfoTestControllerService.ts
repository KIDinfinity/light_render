
import request from '@/utils/request';

export async function requestIdentify(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/test/requestIdentify', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/test/requestPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  requestIdentify,
  requestPolicyInfo,
}
