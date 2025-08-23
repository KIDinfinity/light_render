import request from '@/utils/request';

export async function agentRefresh(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/agentRefresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshClaimantValidIDInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/claimant/refreshClaimantValidIDInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  agentRefresh,
  refreshClaimantValidIDInfo,
};
