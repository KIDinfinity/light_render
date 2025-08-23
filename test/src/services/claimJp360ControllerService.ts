
import request from '@/utils/request';

export async function getInsured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/getInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredClaimHis(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/getInsuredClaimHis', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredIdByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/getInsuredIdByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/getInsuredInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredPolicy(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/getInsuredPolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateInsured360(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/updateInsured360', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateInsured360Batch(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/jp/updateInsured360Batch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsured,
  getInsuredClaimHis,
  getInsuredIdByClaimNo,
  getInsuredInfo,
  getInsuredPolicy,
  updateInsured360,
  updateInsured360Batch,
}
