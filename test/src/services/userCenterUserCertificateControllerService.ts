
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userCertificate/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userCertificate/deleteByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userCertificate/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userCertificate/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteByUserId,
  findByUserId,
  insert,
}
