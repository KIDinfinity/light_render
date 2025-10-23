
import request from '@/utils/request';

export async function hkAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/hkAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkQcSelection(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/hkQcSelection', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitHkClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitHkClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitHkClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitHkClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitHkSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitHkSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitThClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/submitThClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  hkAutoSubmit,
  hkQcSelection,
  submitHkClaimAssessment,
  submitHkClaimCase,
  submitHkSettlement,
  submitThClaimAssessment,
}
