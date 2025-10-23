
import request from '@/utils/request';

export async function reAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/pa/reAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  reAssessment,
}
