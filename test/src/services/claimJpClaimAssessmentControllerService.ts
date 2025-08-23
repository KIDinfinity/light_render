
import request from '@/utils/request';

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/jp/ca/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInsuredBeneficiaryOwner(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/jp/ca/getPolicyInsuredBeneficiaryOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/jp/ca/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimAssessment,
  getPolicyInsuredBeneficiaryOwner,
  submitClaimAssessment,
}
