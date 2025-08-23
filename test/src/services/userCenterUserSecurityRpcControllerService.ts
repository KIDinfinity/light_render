
import request from '@/utils/request';

export async function asyncRecordLoginDetail(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/security/asyncRecordLoginDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/security/getByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPassword(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/security/getPassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lockedAccountByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/security/lockedAccountByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resetPassword(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/security/resetPassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asyncRecordLoginDetail,
  getByUserId,
  getPassword,
  lockedAccountByUserId,
  resetPassword,
}
