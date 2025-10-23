
import request from '@/utils/request';

export async function remain(params?: any, option?: any): Promise<any> {
  return request('/api/sla/stats/remain', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remain,
}
