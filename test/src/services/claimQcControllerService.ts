
import request from '@/utils/request';

export async function autoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/autoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function convertBpoJsonToArray(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/convertBpoJsonToArray', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAndUpdateAssignDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/getAndUpdateAssignDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAssignDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/getAssignDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getExpectPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/getExpectPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insertDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/insertDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function isAssignDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/isAssignDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/splitCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateAssignDocument(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/updateAssignDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDocumentDataAndRelation(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/qc/updateDocumentDataAndRelation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  autoSubmit,
  convertBpoJsonToArray,
  getAndUpdateAssignDocument,
  getAssignDocument,
  getExpectPolicy,
  insertDocument,
  isAssignDocument,
  splitCase,
  submit,
  updateAssignDocument,
  updateDocumentDataAndRelation,
}
