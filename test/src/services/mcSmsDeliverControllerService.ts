
import request from '@/utils/request';

export async function sendSms(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/smsdeliver/sendSms', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendSms,
}
