
import request from '@/utils/request';

export async function queryEmailConfig(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/queryEmailConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryEmailConfig,
}
