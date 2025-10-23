
import request from '@/utils/request';

export async function getByMessageId(params?: any, option?: any): Promise<any> {
  return request('/api/misc/messagelevel/getByMessageId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getByMessageId,
}
