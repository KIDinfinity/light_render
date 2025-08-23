
import request from '@/utils/request';

export async function getUnknownSubmissionData(params?: any, option?: any): Promise<any> {
  return request('/api/doc/inquiry/getUnknownSubmissionData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getUnknownSubmissionData,
}
