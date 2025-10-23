
import request from '@/utils/request';

export async function getClaimPaymentForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimPaymentForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimPaymentForWool,
}
