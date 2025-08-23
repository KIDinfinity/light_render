
import request from '@/utils/request';

export async function accumulate(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/360/accumulate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  accumulate,
}
