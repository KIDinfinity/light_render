
import request from '@/utils/request';

export async function apply(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/apply', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDocuments(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/getDocuments', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/validate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  apply,
  create,
  get,
  getDocuments,
  save,
  submit,
  validate,
}
