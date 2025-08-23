import request from '@/utils/request';

export async function requestPolicyPmModeChangeVal(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/requestPolicyPmModeChangeVal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestSrvPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/requestSrvPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncRequestSrvPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/asyncRequestSrvPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncRequestSrvPolicyResult(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/getAsyncRequestSrvPolicyResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  requestPolicyPmModeChangeVal,
  requestSrvPolicy,
  asyncRequestSrvPolicy,
  getAsyncRequestSrvPolicyResult,
};
