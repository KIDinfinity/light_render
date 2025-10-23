
import request from '@/utils/request';

export async function getHkAssessmentParam(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/param/getHkAssessmentParam', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getHkAssessmentParam,
}
