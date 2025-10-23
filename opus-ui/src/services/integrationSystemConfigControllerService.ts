
import request from '@/utils/request';

export async function getSystemConfig(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/getSystemConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSystemConfig,
}
