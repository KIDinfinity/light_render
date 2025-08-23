import request from '@/utils/request';

export async function jpListPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/jpListPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPolicies(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/listPolicies', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/listPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPolicyIdsByInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/listPolicyIdsByInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listThRolloverLimit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/policy/listThRolloverLimit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  jpListPolicy,
  list,
  listPolicies,
  listPolicy,
  listPolicyIdsByInsuredId,
  listThRolloverLimit,
};
