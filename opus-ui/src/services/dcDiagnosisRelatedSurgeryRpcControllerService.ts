
import request from '@/utils/request';

export async function getDiagnosisRelatedSurgeryListForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getDiagnosisRelatedSurgeryListForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDiagnosisRelatedSurgeryListForWool,
}
