
import request from '@/utils/request';

export async function decrypt(params?: any, option?: any): Promise<any> {
  return request('/misc/sensitive/decrypt', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function encrypt(params?: any, option?: any): Promise<any> {
  return request('/misc/sensitive/encrypt', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  decrypt,
  encrypt,
}
