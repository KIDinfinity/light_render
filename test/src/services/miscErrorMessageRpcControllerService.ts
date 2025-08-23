
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/error/message/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
}
