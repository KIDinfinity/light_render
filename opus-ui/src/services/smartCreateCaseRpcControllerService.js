import request from '@/utils/request';

export async function create(params) {
  return request('/rpc/claim/case/create', {
    method: 'POST',
    body: params,
  });
}

export async function createClaimNo(params) {
  return request('/rpc/claim/case/createClaimNo', {
    method: 'POST',
    body: params,
  });
}

export async function deleteClaimDataByCaseCategory(params) {
  return request('/rpc/claim/case/deleteClaimDataByCaseCategory', {
    method: 'POST',
    body: params,
  });
}

export async function get(params) {
  return request('/rpc/claim/case/get', {
    method: 'POST',
    body: params,
  });
}

export async function getClaimant(params) {
  return request('/rpc/claim/case/getClaimant', {
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfo(params) {
  return request('/rpc/claim/case/getPendingUserInfo', {
    method: 'POST',
    body: params,
  });
}

export async function getPendingUserInfoByFristName(params) {
  return request('/rpc/claim/case/getPendingUserInfoByFristName', {
    method: 'POST',
    body: params,
  });
}

export async function rpcCreateClaimCase(params) {
  return request('/rpc/claim/case/rpcCreateClaimCase', {
    method: 'POST',
    body: params,
  });
}

export async function smartCreate(params) {
  return request('/rpc/claim/case/smartCreate', {
    method: 'POST',
    body: params,
  });
}

export async function submit(params) {
  return request('/rpc/claim/case/submit', {
    method: 'POST',
    body: params,
  });
}

export async function updateClaimNo(params) {
  return request('/rpc/claim/case/updateClaimNo', {
    method: 'POST',
    body: params,
  });
}

export async function validate(params) {
  return request('/rpc/claim/case/validate', {
    method: 'POST',
    body: params,
  });
}

export default {
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
  validate,
};
