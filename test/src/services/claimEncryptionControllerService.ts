
import request from '@/utils/request';

export async function clearAllEncryption(params?: any, option?: any): Promise<any> {
  return request('/api/claim/encryption/clearAllEncryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function clearEncryptionConfigByObjectName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/encryption/clearEncryptionConfigByObjectName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  clearAllEncryption,
  clearEncryptionConfigByObjectName,
}
