
import request from '@/utils/request';

export async function search(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dropdown/search', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  search,
}
