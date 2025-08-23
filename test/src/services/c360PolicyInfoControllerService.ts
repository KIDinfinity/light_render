import request from '@/utils/request';

export async function addPolicyNotes(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/addPolicyNotes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initAndReturnPolicyFromOds(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initAndReturnPolicyFromOds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initPolicyFromCommonDb(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initPolicyFromCommonDb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initPolicyFromDb(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initPolicyFromDb', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initPolicyFromHkCoreClaim(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initPolicyFromHkCoreClaim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initPolicyFromOds(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initPolicyFromOds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function initPolicyFromPhPos(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/create/initPolicyFromPhPos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/getByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByPartyId(params?: any, option?: any): Promise<any> {
  return request('/api/c360/policyInfo/getByPartyId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  initAndReturnPolicyFromOds,
  initPolicyFromCommonDb,
  initPolicyFromDb,
  initPolicyFromHkCoreClaim,
  initPolicyFromOds,
  initPolicyFromPhPos,
  getByBusinessNo,
  getByPartyId,
};
