
import request from '@/utils/request';

export async function callOffSch(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/callOffSch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function delDraft(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/delDraft', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function delSch(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/delSch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function detail(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/detail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsDraft(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/lsDraft', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function lsSent(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/lsSent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function newDraft(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/newDraft', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendImm(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/sendImm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendSch(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/sendSch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDraft(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/updateDraft', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateSch(params?: any, option?: any): Promise<any> {
  return request('/api/mc/notification/updateSch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  callOffSch,
  delDraft,
  delSch,
  detail,
  lsDraft,
  lsSent,
  newDraft,
  sendImm,
  sendSch,
  updateDraft,
  updateSch,
}
