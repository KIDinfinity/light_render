import request from '@/utils/request';

export async function registerMcs(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/check/registerMcs', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function hasCallRegisterMcs(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/check/hasCallRegisterMcs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  registerMcs,
  hasCallRegisterMcs,
};
