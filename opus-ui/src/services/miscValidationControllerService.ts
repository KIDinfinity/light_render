
import request from '@/utils/request';

export async function evictValidateCache(params?: any, option?: any): Promise<any> {
  return request('/api/misc/validate/evictValidateCache', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  evictValidateCache,
}
