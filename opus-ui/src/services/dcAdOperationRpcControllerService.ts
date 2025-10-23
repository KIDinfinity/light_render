
import request from '@/utils/request';

export async function getADOperationForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADOperationForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADOperationForWool,
}
