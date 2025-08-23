
import request from '@/utils/request';

export async function getClaimType(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/claim/getClaimType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimType,
}
