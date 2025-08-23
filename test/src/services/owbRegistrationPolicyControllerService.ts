import request from '@/utils/request';

export async function asyncRequestPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/registration/policy/asyncRequestPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncRequestPolicyResult(params?: any, option?: any): Promise<any> {
  return request('/api/registration/policy/getAsyncRequestPolicyResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asyncRequestPolicy,
  getAsyncRequestPolicyResult,
};
