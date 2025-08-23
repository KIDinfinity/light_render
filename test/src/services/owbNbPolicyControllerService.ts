
import request from '@/utils/request';

export async function cancelPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/cancelPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/createPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function issuePolicy(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/issuePolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryPolicyDetail(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/queryPolicyDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryPolicyList(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/queryPolicyList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePolicy(params?: any, option?: any): Promise<any> {
  return request('/api/nb/policy/updatePolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cancelPolicy,
  createPolicy,
  issuePolicy,
  queryPolicyDetail,
  queryPolicyList,
  updatePolicy,
}
