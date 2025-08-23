import request from '@/utils/request';

export async function callJpAccidentRptEntry(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/callJpAccidentRptEntry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/createClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteClaimDataByCaseCategory(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/deleteClaimDataByCaseCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimant(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/getClaimant', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/getPendingUserInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfoByFristName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/getPendingUserInfoByFristName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function smartCreate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/smartCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/updateClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateClaimStatusToClosed(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/updateClaimStatusToClosed', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/validate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMarkinId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/getMarkinId', { ...option, method: 'POST', body: params });
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
  smartCreate,
  submit,
  updateClaimNo,
  updateClaimStatusToClosed,
  validate,
  getMarkinId,
};
