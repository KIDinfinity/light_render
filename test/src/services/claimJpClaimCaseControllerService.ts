
import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/ca/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
}
