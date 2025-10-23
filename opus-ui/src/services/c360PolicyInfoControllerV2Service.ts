import request from '@/utils/request';

export async function getByInsured(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/getByInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/getPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/requestPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestPolicyInfoForLoadClaimHistory(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/c360/policyInfo/requestPolicyInfoForLoadClaimHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestRealTimePolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/requestRealTimePolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateSideBarPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/updateSideBarPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function requestRedepositPolicyInfo(
  params?: {
    clientId: string;
    regionCode: string;
  },
  option?: any
): Promise<{
  success: boolean;
  resultData: {
    policyCurrency: string;
    policyId: string;
  }[];
}> {
  return request('/api/c360/policyInfo/requestRedepositPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getByInsured,
  getPolicyInfo,
  requestPolicyInfo,
  requestPolicyInfoForLoadClaimHistory,
  requestRealTimePolicyInfo,
  updateSideBarPolicyInfo,
  requestRedepositPolicyInfo,
};
