
import request from '@/utils/request';

export async function execute(params?: any, option?: any): Promise<any> {
  return request('/rpc/nb/ntu/execute', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  execute,
}
