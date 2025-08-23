
import request from '@/utils/request';

export async function send(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/bpm/message/send', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendMessages(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/bpm/message/sendMessages', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  send,
  sendMessages,
}
