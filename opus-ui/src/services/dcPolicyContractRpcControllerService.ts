
import request from '@/utils/request';

export async function getPolicyContractForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getPolicyContractForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyContractForWool,
}
