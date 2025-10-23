
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getMcsClaimPaymentList(params?: any, option?: any): Promise<any> {
  return request(`/rpc/claim/hk/getMcsClaimPaymentList?${stringify(params)}`, {
    ...option,
  });
}

export async function checkClaimNoMappingExistance(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hk/register/checkClaimNoMappingExistance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function claimApproveRequest(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hk/register/claimApproveRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimNoMappingByInquiryClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hk/register/getClaimNoMappingByInquiryClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function registerHkClaimCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hk/register/registerHkClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getMcsClaimPaymentList,
  checkClaimNoMappingExistance,
  claimApproveRequest,
  getClaimNoMappingByInquiryClaimNo,
  registerHkClaimCase,
}
