
import request from '@/utils/request';

export async function syncThEnvoy(params?: any, option?: any): Promise<any> {
  return request('/api/evy/sync/syncThEnvoy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  syncThEnvoy,
}
