import { stringify } from 'qs';
import request from '@/utils/request';

export async function countTaskStatus(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/countTaskStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findBizData(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/bizProcess/findBizData?${stringify(params)}`, {
    ...option,
  });
}

export async function findBizDataObject(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/findBizDataObject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBizProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/findBizProcess', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/getClaimCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPreApprovalValue(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/getPreApprovalValue', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBusinessProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/saveBusinessProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/bizProcess/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCurrentTaskIdByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/task/getCurrentTaskIdByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function toggleUrgent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/process/toggleUrgent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function advSearchExport(params?: any, option?: any): Promise<any> {
  return request('/api/dw/claim/query/claimHistorySearchExport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  countTaskStatus,
  findBizData,
  findBizDataObject,
  findBizProcess,
  getClaimCaseNo,
  getPreApprovalValue,
  saveBusinessProcess,
  update,
  getCurrentTaskIdByBusinessNo,
  toggleUrgent,
  advSearchExport,
};
