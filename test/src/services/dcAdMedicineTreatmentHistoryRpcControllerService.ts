
import request from '@/utils/request';

export async function getADMedicineTreatmentForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADMedicineTreatmentForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADMedicineTreatmentForWool,
}
