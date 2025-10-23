
import request from '@/utils/request';

export async function getBaseAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getBaseAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBaseClaim(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getBaseClaim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHkClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getHkClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHkClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getHkClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpclmAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getJpclmAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpclmQc(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getJpclmQc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpclmRegistration(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getJpclmRegistration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPhAppealAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getPhAppealAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPhAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getPhAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPhClaim(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getPhClaim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getBaseAssessment,
  getBaseClaim,
  getHkClaimAssessment,
  getHkClaimCase,
  getJpclmAssessment,
  getJpclmQc,
  getJpclmRegistration,
  getPhAppealAssessment,
  getPhAssessment,
  getPhClaim,
}
