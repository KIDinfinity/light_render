
import request from '@/utils/request';

export async function getClaimInsuredByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimInsuredByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimInsuredByClaimNo,
}
