
import request from '@/utils/request';

export async function createTriggerCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/ca/createTriggerCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  createTriggerCase,
}
