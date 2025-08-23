import { stringify } from 'qs';
import request from '@/utils/request';

export async function activateReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/activateReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoSaveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/autoSaveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkHasUnreadReasonGroup(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/reasons/checkHasUnreadReasonGroup?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function deleteReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/deleteReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function draftReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/draftReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findReasonInfo(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/findReasonInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getReminderSendTime(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/getReminderSendTime', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function markReasonGroupRead(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/markReasonGroupRead', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function resolveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/resolveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/saveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendReminder(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/sendReminder', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function switchReminder(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/switchReminder', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updatePendingMemoStatus(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/reasons/updatePendingMemoStatus?${stringify(params)}`, {
    ...option,
  });
}

export async function waivePendingMemo(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/reasons/waivePendingMemo?${stringify(params)}`, {
    ...option,
  });
}

export async function waiveReasonGroup(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/waiveReasonGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findExtraFunctionsByGroupId(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/findExtraFunctionsByGroupId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshReasonExtraFunction(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/refreshReasonExtraFunction', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  activateReasonGroup,
  autoSaveReasonGroup,
  checkHasUnreadReasonGroup,
  deleteReasonGroup,
  draftReasonGroup,
  findReasonInfo,
  getReminderSendTime,
  markReasonGroupRead,
  resolveReasonGroup,
  saveReasonGroup,
  sendReminder,
  switchReminder,
  updatePendingMemoStatus,
  waivePendingMemo,
  waiveReasonGroup,
  findExtraFunctionsByGroupId,
  refreshReasonExtraFunction,
};
