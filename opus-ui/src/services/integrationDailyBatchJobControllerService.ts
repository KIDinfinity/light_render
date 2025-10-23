
import request from '@/utils/request';

export async function start(params?: any, option?: any): Promise<any> {
  return request('/api/integration/dailyBatchJob/start', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  start,
}
