
import request from '@/utils/request';

export async function getEncryptionConfigByModuleObject(params?: any, option?: any): Promise<any> {
  return request('/api/misc/encryptionConfig/getEncryptionConfigByModuleObject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEncryptionConfigByModuleObject,
}
