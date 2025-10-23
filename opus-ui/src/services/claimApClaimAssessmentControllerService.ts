
import request from '@/utils/request';

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimAssessment,
  submitClaimAssessment,
}
