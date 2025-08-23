
import request from '@/utils/request';

export async function findProcessStatus(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/findProcessStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function activateProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/activateProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/deleteProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/getProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessInstanceDiagram(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/getProcessInstanceDiagram', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessInstanceInfo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/getProcessInstanceInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessInstanceProgress(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/getProcessInstanceProgress', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessInstances(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/listProcessInstances', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listProcessInstancesHist(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/listProcessInstancesHist', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/startProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startSyncProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/startSyncProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function suspendProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/processInstance/suspendProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findProcessStatus,
  activateProcessInstance,
  deleteProcessInstance,
  getProcessInstance,
  getProcessInstanceDiagram,
  getProcessInstanceInfo,
  getProcessInstanceProgress,
  listProcessInstances,
  listProcessInstancesHist,
  startProcessInstance,
  startSyncProcessInstance,
  suspendProcessInstance,
}
