
import request from '@/utils/request';

export async function sendMessage(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/messagedeliver/sendMessage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendMessage,
}
