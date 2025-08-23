
import request from '@/utils/request';

export async function sendEmail(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/emaildeliver/sendEmail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendEmail,
}
