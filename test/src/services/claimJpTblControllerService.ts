
import request from '@/utils/request';

export async function getStdAdvancedMedical(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/tbl/advancedMedical/getStdAdvancedMedical', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getStdDiagnosis(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/tbl/diagnosis/getStdDiagnosis', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getStdProcedures(params?: any, option?: any): Promise<any> {
  return request('/api/claim/jp/tbl/procedure/getStdProcedures', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getStdAdvancedMedical,
  getStdDiagnosis,
  getStdProcedures,
}
