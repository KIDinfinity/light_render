
import request from '@/utils/request';

export async function sendCaseRegistrationInitQueue(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/th/mock/sendCaseRegistrationInitQueue', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendQueue(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/th/mock/sendQueue', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendCaseRegistrationInitQueue,
  sendQueue,
}
