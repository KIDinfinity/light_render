
import request from '@/utils/request';

export async function getSrvTransactionForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/srv/getSrvTransactionForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSrvTransactionForWool,
}
