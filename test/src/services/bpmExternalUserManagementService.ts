
import request from '@/utils/request';

export async function listByType(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/externalUser/listByType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listByType,
}
