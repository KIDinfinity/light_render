
import request from '@/utils/request';

export async function claimAssessment(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/claimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function extract(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/extract', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function extractFromClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/extractFromClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function policyYearCalculate(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/policyYearCalculate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  claimAssessment,
  extract,
  extractFromClaimCase,
  policyYearCalculate,
}
