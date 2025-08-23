
import request from '@/utils/request';

export async function rpcCreateClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/rpcCreateClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveApplyPolicyList(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/saveApplyPolicyList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  rpcCreateClaimCase,
  saveApplyPolicyList,
}
