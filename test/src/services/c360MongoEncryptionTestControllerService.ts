
import request from '@/utils/request';

export async function getPolicyInfoEncryption(params?: any, option?: any): Promise<any> {
  return request('/api/c360/claim/getPolicyInfoEncryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function setPolicyInfoEncryption(params?: any, option?: any): Promise<any> {
  return request('/api/c360/claim/setPolicyInfoEncryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyInfoEncryption,
  setPolicyInfoEncryption,
}
