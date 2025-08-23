
import request from '@/utils/request';

export async function cleanPayableData(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/cleanPayableData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAndPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimAndPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimant(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getClaimant', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredAndPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getInsuredAndPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanPayableData,
  getClaimAndPolicyInfo,
  getClaimant,
  getInsuredAndPolicyInfo,
}
