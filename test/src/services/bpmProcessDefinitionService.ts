
import request from '@/utils/request';

export async function activateProcessDefinition(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/activateProcessDefinition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteProcessAct(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/activity/deleteProcessAct', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insertProcessAct(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/activity/insertProcessAct', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateProcessAct(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/activity/updateProcessAct', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteProcessDefType(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/deleteProcessDefType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getModelResource(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/getModelResource', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessDefType(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/getProcessDefType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessDefinition(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/getProcessDefinition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessInfoByOrgMemberList(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/getProcessInfoByOrgMemberList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insertProcessDefType(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/insertProcessDefType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function suspendProcessDefinition(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/suspendProcessDefinition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateProcessDefType(params?: any, option?: any): Promise<any> {
  return request('/api/management/bpm/process/updateProcessDefType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  activateProcessDefinition,
  deleteProcessAct,
  insertProcessAct,
  updateProcessAct,
  deleteProcessDefType,
  getModelResource,
  getProcessDefType,
  getProcessDefinition,
  getProcessInfoByOrgMemberList,
  insertProcessDefType,
  suspendProcessDefinition,
  updateProcessDefType,
}
