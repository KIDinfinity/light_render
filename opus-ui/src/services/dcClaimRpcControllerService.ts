
import request from '@/utils/request';

export async function getClaimAndPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimAndPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimLimitData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimLimitData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoByInquiryClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimNoByInquiryClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoByInsuredAndClaimant(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimNoByInsuredAndClaimant', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimPaymentByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getClaimPaymentByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInsuredAndPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getInsuredAndPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getMedicalProviderNameByCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getMedicalProviderNameByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listClaimCaseByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/listClaimCaseByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listRelevantCaseByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/listRelevantCaseByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimAndPolicyInfo,
  getClaimLimitData,
  getClaimNoByInquiryClaimNo,
  getClaimNoByInsuredAndClaimant,
  getClaimPaymentByClaimNo,
  getInsuredAndPolicyInfo,
  getMedicalProviderNameByCode,
  listClaimCaseByClaimNos,
  listRelevantCaseByClaimNo,
}
