
import request from '@/utils/request';

export async function getMessageInfo(params?: any, option?: any): Promise<any> {
  return request('/api/misc/messageinfo/getMessageInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getMessageInfo,
}
