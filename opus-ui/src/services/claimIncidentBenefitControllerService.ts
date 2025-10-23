
import request from '@/utils/request';

export async function getClaimIncidentBenefitPolicyNosByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/incident/benefit/getClaimIncidentBenefitPolicyNosByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimIncidentBenefitPolicyNosByClaimNo,
}
