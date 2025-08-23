
import request from '@/utils/request';

export async function initialProcess(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/initialProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveAssessmentOds(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/saveAssessmentOds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveAssessmentOdsWithJson(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/saveAssessmentOdsWithJson', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInsuredInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/saveInsuredInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInsuredInfoWithJson(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/saveInsuredInfoWithJson', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateMockJson(params?: any, option?: any): Promise<any> {
  return request('/api/claim/ods/updateMockJson', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  initialProcess,
  saveAssessmentOds,
  saveAssessmentOdsWithJson,
  saveInsuredInfo,
  saveInsuredInfoWithJson,
  updateMockJson,
}
