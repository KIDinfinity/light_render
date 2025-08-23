
import request from '@/utils/request';

export async function queryByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/transaction/queryByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByBusinessNo,
}
