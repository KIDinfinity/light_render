
import request from '@/utils/request';

export async function manualAssessment(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/processDirect/manualAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  manualAssessment,
}
