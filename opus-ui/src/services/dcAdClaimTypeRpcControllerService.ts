
import request from '@/utils/request';

export async function getADClaimTypes(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADClaimTypes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADClaimTypes,
}
