
import request from '@/utils/request';

export async function getSensitives(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/sensitive/getSensitives', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSensitives,
}
