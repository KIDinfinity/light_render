
import request from '@/utils/request';

export async function baseCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/baseCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/hkCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkManualCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/hkManualCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hkSubmissionCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/hkSubmissionCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function identifyHbBatchCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/identifyHbBatchCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function jpclmCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/jpclmCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phAppealCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/phAppealCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/phCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function phSubmissionCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/phSubmissionCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  baseCreate,
  hkCreate,
  hkManualCreate,
  hkSubmissionCreate,
  identifyHbBatchCreate,
  jpclmCreate,
  phAppealCreate,
  phCreate,
  phSubmissionCreate,
}
