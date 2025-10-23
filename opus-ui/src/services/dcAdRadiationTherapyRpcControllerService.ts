
import request from '@/utils/request';

export async function getADRadiationTherapyForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADRadiationTherapyForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADRadiationTherapyForWool,
}
