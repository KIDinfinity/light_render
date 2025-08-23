
import request from '@/utils/request';

export async function baseAiFlow(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/baseAiFlow', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkAiAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/hkAiAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkAiAssessmentHb(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/hkAiAssessmentHb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkAiIndicator(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/hkAiIndicator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkAiIndicatorHb(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/hkAiIndicatorHb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpAccidentRptEntry(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/jpAccidentRptEntry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpAiAssessmentHb(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/jpAiAssessmentHb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpAiIndicatorHb(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/jpAiIndicatorHb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phGaClaimApproval(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/phGaClaimApproval', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phGaClaimRegister(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/test/phGaClaimRegister', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  baseAiFlow,
  hkAiAssessment,
  hkAiAssessmentHb,
  hkAiIndicator,
  hkAiIndicatorHb,
  jpAccidentRptEntry,
  jpAiAssessmentHb,
  jpAiIndicatorHb,
  phGaClaimApproval,
  phGaClaimRegister,
}
