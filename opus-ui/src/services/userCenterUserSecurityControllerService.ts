
import request from '@/utils/request';

export async function initAllUserPassword(params?: any, option?: any): Promise<any> {
  return request('/api/uc/user/security/initAllUserPassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePassword(params?: any, option?: any): Promise<any> {
  return request('/api/uc/user/security/updatePassword', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  initAllUserPassword,
  updatePassword,
}
