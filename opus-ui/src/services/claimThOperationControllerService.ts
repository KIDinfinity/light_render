
import request from '@/utils/request';

export async function thCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/thCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getThAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getThAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getThClaim(params?: any, option?: any): Promise<any> {
  return request('/api/claim/inquiry/getThClaim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ThClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/ThClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function thAutoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/thAutoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function thCaseSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/thCaseSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  thCreate,
  getThAssessment,
  getThClaim,
  ThClaimAssessment,
  thAutoSubmit,
  thCaseSubmit,
}
