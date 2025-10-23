
import request from '@/utils/request';

export async function checkInfoExistByCategoryCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/checkInfoExistByCategoryCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanNotice(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/cleanNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteCaseInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/deleteCaseInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDataAfterReject(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/deleteDataAfterReject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteTaskInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/deleteTaskInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBusinessCheckInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/findBusinessCheckInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCategroyReason(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/getCategroyReason', {
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

export async function querySPApprovalRequestByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/querySPApprovalRequestByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshNotices(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/refreshNotices', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatchInformationReference(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveBatchInformationReference', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveEnvoyInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveEnvoyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveLinkToCaseByDocumentIds(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/info/saveLinkToCaseByDocumentIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkInfoExistByCategoryCode,
  cleanNotice,
  deleteCaseInformation,
  deleteDataAfterReject,
  deleteTaskInformation,
  findBusinessCheckInfo,
  getCategroyReason,
  getCommentsByBusinessNo,
  querySPApprovalRequestByCaseNo,
  refreshNotices,
  saveBatch,
  saveBatchInformationReference,
  saveEnvoyInfo,
  saveInformation,
  saveLinkToCaseByDocumentIds,
}
