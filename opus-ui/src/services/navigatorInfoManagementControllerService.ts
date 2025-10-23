
import request from '@/utils/request';

export async function remarks(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/360/remarks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchSave(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/batchSave', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkBeforeReject(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/checkBeforeReject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkBeforeSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/checkBeforeSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDataAfterReject(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/deleteDataAfterReject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDataAfterSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/deleteDataAfterSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findInfoListByCondition(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/findInfoListByCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClassification(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/getClassification', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDefaultActivityCode(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/getDefaultActivityCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function markInfoIsRead(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/markInfoIsRead', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/info/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remarks,
  batchSave,
  checkBeforeReject,
  checkBeforeSubmit,
  deleteDataAfterReject,
  deleteDataAfterSubmit,
  findInfoListByCondition,
  getClassification,
  getDefaultActivityCode,
  markInfoIsRead,
  saveInformation,
}
