
import request from '@/utils/request';

export async function changeStatus(params?: any, option?: any): Promise<any> {
  return request('/api/mc/broadcast/changeStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  changeStatus,
}
