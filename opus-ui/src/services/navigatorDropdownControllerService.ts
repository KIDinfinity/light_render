
import request from '@/utils/request';

export async function search(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dropdown/search', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  search,
}
