
import request from '@/utils/request';

export async function sendNotification(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/logInOutNotify/sendNotification', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendNotification,
}
