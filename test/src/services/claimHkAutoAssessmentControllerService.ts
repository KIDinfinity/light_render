
import request from '@/utils/request';

export async function getMcsClaimNoMapping(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/hk/getMcsClaimNoMapping', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/hk/reAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/hk/saveClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveClaimPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/hk/saveClaimPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getMcsClaimNoMapping,
  reAssessment,
  saveClaimAssessment,
  saveClaimPolicyInfo,
}
