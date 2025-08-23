
import request from '@/utils/request';

export async function cashlessReAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/opd/cashlessReAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/opd/reAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cashlessReAssessment,
  reAssessment,
}
