
import request from '@/utils/request';

export async function getSubmissionConfig(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/submission/getSubmissionConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSubmissionConfig,
}
