import request from '@/utils/request';

export async function getApprovalProcedureKjCodeForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/getApprovalProcedureKjCodeForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getStandardDiagnosisNameIcdForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/getStandardDiagnosisNameIcdForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getStandardDrugListForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/getStandardDrugListForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getPlanJPStdAdvancedMedicalList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/getPlanJPStdAdvancedMedicalList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getApprovalProcedureKjCodeForPage,
  getStandardDiagnosisNameIcdForPage,
  getStandardDrugListForPage,
  getPlanJPStdAdvancedMedicalList,
};
