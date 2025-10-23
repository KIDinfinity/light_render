
import request from '@/utils/request';

export async function listDisplayConfig(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/listDisplayConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listDisplayConfig,
}
