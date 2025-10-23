
import request from '@/utils/request';

export async function query(params?: any, option?: any): Promise<any> {
  return request('/rpc/sc/query', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  query,
}
