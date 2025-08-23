import request from '@/utils/request';
import { stringify } from 'qs';

export async function checkExistDoc(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/checkExistDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function byNodeId(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/getShareLink/byNodeId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function all(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewConfig/all', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function byGroupCode(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewConfig/byGroupCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function byPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewConfig/byPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewInfo/ByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function attachDocByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewInfo/attachDocByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function byCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewInfo/byCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function loopSearchDocView(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/list/docViewInfo/loopSearchDocView', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveDocLayout(params?: any, option?: any): Promise<any> {
  return request('/api/doc/view/saveDocLayout', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function identifyPolicyNoRelCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/identifyPolicyNoRelCaseNo?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

export async function getDocId(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/getDocConfigs`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBusinessProcessInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/getBusinessProcessInfo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestPolicyBasicInfo(params?: any, option?: any): Promise<any> {
  return request(`/api/c360/policyInfo/requestPolicyBasicInfo`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reIndexDoc(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/reIndexDoc`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncRequestReIndexDoc(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/asyncRequestReIndexDoc`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncRequestReIndexDoc(params?: any, option?: any): Promise<any> {
  return request(`/api/doc/view/getAsyncRequestReIndexDoc`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkExistDoc,
  byNodeId,
  all,
  byGroupCode,
  byPolicyNo,
  ByBusinessNo,
  attachDocByCaseNo,
  byCaseNo,
  loopSearchDocView,
  saveDocLayout,
  identifyPolicyNoRelCaseNo,
  getDocId,
  getBusinessProcessInfo,
  reIndexDoc,
  requestPolicyBasicInfo,
  asyncRequestReIndexDoc,
  getAsyncRequestReIndexDoc,
};
