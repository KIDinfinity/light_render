
import request from '@/utils/request';

export async function listBenefitFactors(params?: any, option?: any): Promise<any> {
  return request('/api/claim/plan/assess/listBenefitFactors', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listBenefitFactors,
}
