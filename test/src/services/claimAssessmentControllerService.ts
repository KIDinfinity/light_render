
import request from '@/utils/request';

export async function cleanPayableData(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/cleanPayableData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteData(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/deleteData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/getClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimHistory(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/getClaimHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitClaimAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/submitClaimAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanPayableData,
  deleteData,
  getClaimAssessment,
  getClaimHistory,
  submitClaimAssessment,
}
