
import request from '@/utils/request';

export async function heartBeat(params?: any, option?: any): Promise<any> {
  return request('/api/registration/heartBeat', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  heartBeat,
}
