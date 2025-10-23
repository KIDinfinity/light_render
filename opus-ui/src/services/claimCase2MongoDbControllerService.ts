
import request from '@/utils/request';

export async function add(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/th/claim2mongodb/add', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  add,
}
