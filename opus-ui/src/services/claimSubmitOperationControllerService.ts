
import request from '@/utils/request';

export async function baseAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/baseAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpclmAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/jpclmAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phCorrespondenceAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/phCorrespondenceAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendAppForm(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/sendAppForm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitBaseClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitBaseClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitBaseClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitBaseClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpclmAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitJpclmAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitJpclmQc(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitJpclmQc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhAppealAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhAppealAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimApproval(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhClaimApproval', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhCta(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhCta', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPhQc(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitPhQc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitThSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitThSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  baseAutoSubmit,
  jpclmAutoSubmit,
  phCorrespondenceAutoSubmit,
  sendAppForm,
  submitBaseClaimAssessment,
  submitBaseClaimCase,
  submitJpclmAssessment,
  submitJpclmQc,
  submitPhAppealAssessment,
  submitPhClaimApproval,
  submitPhClaimAssessment,
  submitPhClaimCase,
  submitPhCta,
  submitPhQc,
  submitThSettlement,
}
