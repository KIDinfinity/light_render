
import request from '@/utils/request';

export async function trigger(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/dataBatch/trigger', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  trigger,
}
