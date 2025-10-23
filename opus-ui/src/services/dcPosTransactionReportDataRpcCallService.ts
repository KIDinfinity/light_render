
import request from '@/utils/request';

export async function queryByCondition(params?: any, option?: any): Promise<any> {
  return request('/rpc/report/pos/transaction/queryByCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByCondition,
}
