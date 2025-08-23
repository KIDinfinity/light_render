
import request from '@/utils/request';

export async function getClaimantListForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimantListForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimantListForWool,
}
