
import request from '@/utils/request';

export async function findDocRefs(params?: any, option?: any): Promise<any> {
  return request('/api/doc/findDocRefs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUDS(params?: any, option?: any): Promise<any> {
  return request('/api/doc/findUDS', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitUDS(params?: any, option?: any): Promise<any> {
  return request('/api/doc/submitUDS', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateSubmission(params?: any, option?: any): Promise<any> {
  return request('/api/doc/validateSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDocRefs,
  findUDS,
  submitUDS,
  validateSubmission,
}
