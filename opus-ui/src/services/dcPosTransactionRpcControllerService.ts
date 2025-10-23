
import request from '@/utils/request';

export async function getPOSTransactionForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getPOSTransactionForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPOSTransactionForWool,
}
