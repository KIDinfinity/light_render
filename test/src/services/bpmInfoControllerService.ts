import request from '@/utils/request';
import { stringify } from 'qs';

export async function allCategoryInformation(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/allCategoryInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkBeforeReject(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/checkBeforeReject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkBeforeSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/checkBeforeSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkHasUnreadInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/checkHasUnreadInfo', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteDataAfterSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/deleteDataAfterSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCategroyReason(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/getCategroyReason', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCategroyReasonByList(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/getCategroyReasonByList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getInfoCategoryByMessage(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/getInfoCategoryByMessage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function markInfoIsRead(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/markInfoIsRead', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function markInformationRead(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/markInformationRead', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function pageInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/pageInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remarks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/remarks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/info/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitValidation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/info/submitValidation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendEmail(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/info/sendEmail?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

const api = {
  allCategoryInformation: '/api/bpm/info/allCategoryInformation',
};

export { api };

export default {
  allCategoryInformation,
  checkBeforeReject,
  checkBeforeSubmit,
  checkHasUnreadInfo,
  deleteDataAfterSubmit,
  getCategroyReason,
  getCategroyReasonByList,
  getInfoCategoryByMessage,
  markInfoIsRead,
  markInformationRead,
  pageInfo,
  remarks,
  save,
  submitValidation,
  sendEmail,
};
