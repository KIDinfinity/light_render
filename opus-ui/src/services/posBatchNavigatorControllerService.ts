
import request from '@/utils/request';

export async function batchSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/navigator/batchSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchSubmit,
}
