
import request from '@/utils/request';

export async function decisionMapping(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/decisionMapping', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  decisionMapping,
}
