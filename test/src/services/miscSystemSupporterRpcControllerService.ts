
import request from '@/utils/request';

export async function queryByCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/systemSupporter/queryByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByCode,
}
