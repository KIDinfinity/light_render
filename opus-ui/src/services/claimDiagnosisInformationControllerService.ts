
import request from '@/utils/request';

export async function diagnosis(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosis', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchIsCIByDiagnosisCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosis/searchIsCIByDiagnosisCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosis/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosis/searchNameByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function diagnosisByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosisByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function diagnosisForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosisForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function diagnosisForPageByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/diagnosisForPageByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  diagnosis,
  searchIsCIByDiagnosisCode,
  searchName,
  searchNameByRegionCode,
  diagnosisByRegionCode,
  diagnosisForPage,
  diagnosisForPageByRegionCode,
}
