
import request from '@/utils/request';

export async function batchQueryCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/batchQueryCaseNo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAppeal(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/getClaimAppeal`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimAppealCaseInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/getClaimAppealCaseInfo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getTask(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/getTask`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessInstancesHist(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/listProcessInstancesHist`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsActivitySLA(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/lsActivitySLA`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryBusinessNo(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/queryBusinessNo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/queryCaseNo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request(`/api/navigator/cases/save`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchQueryCaseNo,
  getClaimAppeal,
  getClaimAppealCaseInfo,
  getTask,
  listProcessInstancesHist,
  lsActivitySLA,
  queryBusinessNo,
  queryCaseNo,
  save,
}
