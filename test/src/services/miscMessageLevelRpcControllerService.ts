
import request from '@/utils/request';

export async function queryByCueCodeAndRegionCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/messageLevel/queryByCueCodeAndRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByCueCodeAndRegionCode,
}
