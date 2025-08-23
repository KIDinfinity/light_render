
import request from '@/utils/request';

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/pa/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/pa/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimAssessment,
  submitClaimAssessment,
}
