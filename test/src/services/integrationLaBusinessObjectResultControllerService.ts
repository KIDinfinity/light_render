
import request from '@/utils/request';

export async function findByInquiryClaimNoFunctionStatusResult(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/findByInquiryClaimNoFunctionStatusResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByInquiryClaimNoFunctionStatusResult,
}
