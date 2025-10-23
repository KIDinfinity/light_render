
import request from '@/utils/request';

export async function valid(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/tbl/valid', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  valid,
}
