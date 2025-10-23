
import request from '@/utils/request';

export async function getPolicyBenefitDecisionForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getPolicyBenefitDecisionForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyBenefitDecisionForWool,
}
