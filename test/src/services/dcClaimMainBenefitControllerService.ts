
import request from '@/utils/request';

export async function getClaimMainBenefitByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimMainBenefitByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimMainBenefitByClaimNo,
}
