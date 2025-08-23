
import request from '@/utils/request';

export async function getAssessmentDomain(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/getAssessmentDomain', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAssessmentDomainByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/getAssessmentDomainByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAssessmentDomain,
  getAssessmentDomainByClaimNo,
}
