
import request from '@/utils/request';

export async function getGlobalConfig(params?: any, option?: any): Promise<any> {
  return request('/api/misc/globalconfig/getGlobalConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getGlobalConfig,
}
