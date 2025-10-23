
import request from '@/utils/request';

export async function jpCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/jpCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpManualCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/jpManualCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpSubmissionCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/jpSubmissionCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getJpClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getJpClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getJpClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/jpAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitJpClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitJpClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitJpSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  jpCreate,
  jpManualCreate,
  jpSubmissionCreate,
  getJpClaimAssessment,
  getJpClaimCase,
  jpAutoSubmit,
  submitJpClaimAssessment,
  submitJpClaimCase,
  submitJpSettlement,
}
