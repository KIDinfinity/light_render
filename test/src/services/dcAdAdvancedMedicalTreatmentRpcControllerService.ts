
import request from '@/utils/request';

export async function getADAdvancedMedicalTreatment(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADAdvancedMedicalTreatment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADAdvancedMedicalTreatment,
}
