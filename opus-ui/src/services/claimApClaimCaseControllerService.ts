
import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ap/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ap/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getParentClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ap/getParentClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ap/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  get,
  getParentClaimNo,
  submit,
}
