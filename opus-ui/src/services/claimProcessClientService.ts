
import request from '@/utils/request';

export async function findRelatedBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/findRelatedBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCommentsByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/getCommentsByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listByType(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/listByType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkSplitCaseByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/checkSplitCaseByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFullStpFLagByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getFullStpFLagByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSplitRemarkByBusinessNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getSplitRemarkByBusinessNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getStpFlagByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getStpFlagByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBusinessProcess(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/saveBusinessProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/splitCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/startProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startSyncProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/startSyncProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePendInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/updatePendInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancelRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/relationship/cancelRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveCaseRelationship(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/relationship/saveCaseRelationship', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseNoByBusinessNoBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/getCaseNoByBusinessNoBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findRelatedBusinessNo,
  getCommentsByBusinessNo,
  listByType,
  checkSplitCaseByBusinessNo,
  getFullStpFLagByBusinessNo,
  getSplitRemarkByBusinessNos,
  getStpFlagByBusinessNo,
  saveBusinessProcess,
  splitCase,
  startProcessInstance,
  startSyncProcessInstance,
  updatePendInfo,
  cancelRelationship,
  saveCaseRelationship,
  getCaseNoByBusinessNoBatch,
}
