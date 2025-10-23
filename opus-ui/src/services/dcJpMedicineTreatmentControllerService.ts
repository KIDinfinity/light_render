
import request from '@/utils/request';

export async function getJpMedicineTreatmentByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getJpMedicineTreatmentByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getJpMedicineTreatmentByClaimNo,
}
