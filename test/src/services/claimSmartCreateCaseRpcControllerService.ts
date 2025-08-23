
import request from '@/utils/request';

export async function callJpAccidentRptEntry(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/callJpAccidentRptEntry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/createClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteClaimDataByCaseCategory(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/deleteClaimDataByCaseCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimant(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/getClaimant', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/getPendingUserInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfoByFristName(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/getPendingUserInfoByFristName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rpcCreateClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/rpcCreateClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function smartCreate(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/smartCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/updateClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClaimStatusToClosed(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/updateClaimStatusToClosed', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validate(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/case/validate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  callJpAccidentRptEntry,
  create,
  createClaimNo,
  deleteClaimDataByCaseCategory,
  get,
  getClaimant,
  getPendingUserInfo,
  getPendingUserInfoByFristName,
  rpcCreateClaimCase,
  smartCreate,
  submit,
  updateClaimNo,
  updateClaimStatusToClosed,
  validate,
}
