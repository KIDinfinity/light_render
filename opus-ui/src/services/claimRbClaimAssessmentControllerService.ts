
import request from '@/utils/request';

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/rb/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function split(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/rb/split', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/rb/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimAssessment,
  split,
  submitClaimAssessment,
}
