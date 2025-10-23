
import request from '@/utils/request';

export async function getADTreatmentForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADTreatmentForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADTreatmentForWool,
}
