
import request from '@/utils/request';

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/claim/insured/benefit/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  list,
}
