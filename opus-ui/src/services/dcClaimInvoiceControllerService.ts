
import request from '@/utils/request';

export async function getClaimInvoiceByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimInvoiceByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimInvoiceByClaimNo,
}
