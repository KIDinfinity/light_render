
import request from '@/utils/request';

export async function decryption(params?: any, option?: any): Promise<any> {
  return request('/api/integration/encoder/decryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function encryption(params?: any, option?: any): Promise<any> {
  return request('/api/integration/encoder/encryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  decryption,
  encryption,
}
