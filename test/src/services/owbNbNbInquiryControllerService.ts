import { stringify } from 'qs';
import request from '@/utils/request';

export async function getClient(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getClient', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCustomerIdentification(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getCustomerIdentification', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getNanoProductDetail(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getNanoProductDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyLoanHistorys(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getPolicyLoanHistorys', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPremiumSettlement(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getPremiumSettlement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProposalFlags(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/inquiry/getProposalFlags?${stringify(params)}`, {
    ...option,
  });
}

export async function getQuestions(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getQuestions', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRiskIndicator(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getRiskIndicator', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getUwProposal(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getUwProposal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClientSynSuccessFullyFlag(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/inquiry/getClientSynSuccessFullyFlag?${stringify(params)}`, {
    ...option,
    method: 'GET',
  });
}

export async function getProgressResult(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getProgressResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getNeedUpdateData(params?: any, option?: any): Promise<any> {
  return request('/api/nb/inquiry/getNeedUpdateData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClient,
  getCustomerIdentification,
  getNanoProductDetail,
  getPolicyLoanHistorys,
  getPremiumSettlement,
  getProposalFlags,
  getQuestions,
  getRiskIndicator,
  getUwProposal,
  getClientSynSuccessFullyFlag,
  getProgressResult,
  getNeedUpdateData,
};
