
import { stringify } from 'qs';
import request from '@/utils/request';

export async function findPosDataCaptureByCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/findPosDataCaptureByCaseNo?${stringify(params)}`, {
    ...option,
  });
}

export async function findPosDataCaptureByCaseNoFromMongo(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/findPosDataCaptureByCaseNoFromMongo?${stringify(params)}`, {
    ...option,
  });
}

export async function getPolicyInfoByPolicyNo(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/getPolicyInfoByPolicyNo?${stringify(params)}`, {
    ...option,
  });
}

export async function getPosPendingInfoByPosNo(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/getPosPendingInfoByPosNo?${stringify(params)}`, {
    ...option,
  });
}

export async function queryPayInStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/queryPayInStatus?${stringify(params)}`, {
    ...option,
  });
}

export async function saveTransactionData(params?: any, option?: any): Promise<any> {
  return request('/api/pos/dataCapture/saveTransactionData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function xmldownload(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/dataCapture/xmldownload?${stringify(params)}`, {
    ...option,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/pos/document/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkDuplicatedTransType(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/checkDuplicatedTransType?${stringify(params)}`, {
    ...option,
  });
}

export async function generatePosNo(params?: any, option?: any): Promise<any> {
  return request('/api/pos/transaction/generatePosNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseCategory(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/getCaseCategory?${stringify(params)}`, {
    ...option,
  });
}

export async function getTransactionType(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/getTransactionType?${stringify(params)}`, {
    ...option,
  });
}

export async function getTransactionTypeByCaseCategory(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/getTransactionTypeByCaseCategory?${stringify(params)}`, {
    ...option,
  });
}

export async function getUsTaxInformationByPosNo(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/getUsTaxInformationByPosNo?${stringify(params)}`, {
    ...option,
  });
}

export async function listSubmissionChannels(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/listSubmissionChannels?${stringify(params)}`, {
    ...option,
  });
}

export async function listTransactionTypes(params?: any, option?: any): Promise<any> {
  return request(`/api/pos/transaction/listTransactionTypes?${stringify(params)}`, {
    ...option,
  });
}

export async function saveUsTaxInformationByPosNo(params?: any, option?: any): Promise<any> {
  return request('/api/pos/transaction/saveUsTaxInformationByPosNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncRequestSrvSimplePolicy(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/asyncRequestSrvSimplePolicy', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncRequestSrvSimplePolicyResult(params?: any, option?: any): Promise<any> {
  return request('/api/srv/policy/getAsyncRequestSrvSimplePolicyResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findPosDataCaptureByCaseNo,
  findPosDataCaptureByCaseNoFromMongo,
  getPolicyInfoByPolicyNo,
  getPosPendingInfoByPosNo,
  queryPayInStatus,
  saveTransactionData,
  xmldownload,
  update,
  checkDuplicatedTransType,
  generatePosNo,
  getCaseCategory,
  getTransactionType,
  getTransactionTypeByCaseCategory,
  getUsTaxInformationByPosNo,
  listSubmissionChannels,
  listTransactionTypes,
  saveUsTaxInformationByPosNo,
  asyncRequestSrvSimplePolicy,
  getAsyncRequestSrvSimplePolicyResult,
}
