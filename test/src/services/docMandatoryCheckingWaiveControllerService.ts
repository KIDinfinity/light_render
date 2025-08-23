
import request from '@/utils/request';

export async function deleteByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/deleteByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/findByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitDocMandatoryChecking(params?: any, option?: any): Promise<any> {
  return request('/api/doc/submitDocMandatoryChecking', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteByCaseNo,
  findByCaseNo,
  submitDocMandatoryChecking,
}
