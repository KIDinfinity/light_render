
import request from '@/utils/request';

export async function getBeneficiaryTypeByBenefitType(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/jp/beneficiary/getBeneficiaryTypeByBenefitType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyBeneficiaryList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/jp/beneficiary/getPolicyBeneficiaryList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getBeneficiaryTypeByBenefitType,
  getPolicyBeneficiaryList,
}
