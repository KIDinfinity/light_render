
import request from '@/utils/request';

export async function copyOriginalCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/appeal/copyOriginalCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/appeal/createCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAppealRelateCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/appeal/getAppealRelateCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phCreateAppealValidation(params?: any, option?: any): Promise<any> {
  return request('/api/claim/appeal/phCreateAppealValidation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitAppealAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/appeal/submitAppealAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  copyOriginalCase,
  createCase,
  getAppealRelateCase,
  phCreateAppealValidation,
  submitAppealAssessment,
}
