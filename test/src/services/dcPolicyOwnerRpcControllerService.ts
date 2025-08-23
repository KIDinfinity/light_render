
import request from '@/utils/request';

export async function getPolicyOwnerForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getPolicyOwnerForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyOwnerForWool,
}
