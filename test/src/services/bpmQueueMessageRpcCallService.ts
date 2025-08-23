
import request from '@/utils/request';

export async function getQueueMessageBySubmissionId(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/message/getQueueMessageBySubmissionId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendCaseRegistrationRequestQueue(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/message/sendCaseRegistrationRequestQueue', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getQueueMessageBySubmissionId,
  sendCaseRegistrationRequestQueue,
}
