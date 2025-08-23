
import request from '@/utils/request';

export async function findRelatedBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/findRelatedBusinessNo', {
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

export async function listFormerCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/listFormerCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/checkProcessInstance', {
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

export async function findProcessStatus(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/findProcessStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBusinessProcessByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getBusinessProcessByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getCaseNo', {
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

export async function getManualAssessmentAssignee(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getManualAssessmentAssignee', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSplitRemark(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getSplitRemark', {
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

export async function getUnclosedByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getUnclosedByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessDetails(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/listProcessDetails', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessInstancesHist(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/listProcessInstancesHist', {
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

export async function findRelationshipRecords(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/relationship/findRelationshipRecords', {
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

export async function saveBusinessData(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/saveBusinessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findRelatedBusinessNo,
  listByType,
  listFormerCase,
  checkProcessInstance,
  checkSplitCaseByBusinessNo,
  findProcessStatus,
  getBusinessProcessByCaseNo,
  getCaseNo,
  getFullStpFLagByBusinessNo,
  getManualAssessmentAssignee,
  getSplitRemark,
  getSplitRemarkByBusinessNos,
  getStpFlagByBusinessNo,
  getUnclosedByCaseNo,
  listProcessDetails,
  listProcessInstancesHist,
  saveBusinessProcess,
  splitCase,
  startProcessInstance,
  startSyncProcessInstance,
  updatePendInfo,
  cancelRelationship,
  findRelationshipRecords,
  saveCaseRelationship,
  saveBusinessData,
}
