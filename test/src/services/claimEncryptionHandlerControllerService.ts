
import request from '@/utils/request';

export async function getEncryptionConfigure(params?: any, option?: any): Promise<any> {
  return request('/api/claim/encryption/getEncryptionConfigure', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEncryptionConfigure,
}
