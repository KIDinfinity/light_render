
import request from '@/utils/request';

export async function auto(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/assess/auto', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function re(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/assess/re', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/assessment/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/case/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/case/manualCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function supplement(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/case/submission/supplement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submissionCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/case/submissionCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/case/submitClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function duplicateCheck(params?: any, option?: any): Promise<any> {
    return request('/api/claim/v3/inquiryClaimNo/duplicateCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  auto,
  re,
  submitClaimAssessment,
  create,
  manualCreate,
  supplement,
  submissionCreate,
  submitClaimCase,
}
