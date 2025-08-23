
import request from '@/utils/request';

export async function checkListNotReceivedMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/checkListNotReceivedMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function countDocUploadSuccessByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/countDocUploadSuccessByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function downloadDocForRpc(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/downloadDocForRpc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseRelevantDocViews(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/getCaseRelevantDocViews', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDocConfigs(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/getDocConfigs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listJpDocConfigsByDocTypeCodes(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listJpDocConfigsByDocTypeCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listNotReceivedMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listNotReceivedMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listNotReceivedMandatoryDocByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listNotReceivedMandatoryDocByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listNotReceivedMandatoryDocByCaseNoV2(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listNotReceivedMandatoryDocByCaseNoV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveDocInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/saveDocInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveDocInfoForExternalSubmission(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/saveDocInfoForExternalSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test1(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/test1', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test2(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/test2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test3(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/test3', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/updateMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkListNotReceivedMandatoryDoc,
  countDocUploadSuccessByCaseNo,
  downloadDocForRpc,
  getCaseRelevantDocViews,
  getDocConfigs,
  listJpDocConfigsByDocTypeCodes,
  listNotReceivedMandatoryDoc,
  listNotReceivedMandatoryDocByCaseNo,
  listNotReceivedMandatoryDocByCaseNoV2,
  saveDocInfo,
  saveDocInfoForExternalSubmission,
  test1,
  test2,
  test3,
  updateMandatoryDoc,
}
