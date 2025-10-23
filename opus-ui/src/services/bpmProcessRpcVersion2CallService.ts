
import request from '@/utils/request';

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBusinessData(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/getBusinessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBusinessOperation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/getBusinessOperation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBusinessOperationSubList(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/getBusinessOperationSubList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseNoByBusinessNoBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/getCaseNoByBusinessNoBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBusinessData(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/saveBusinessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/startProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstanceSync(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/v2/startProcessInstanceSync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeTask,
  getBusinessData,
  getBusinessOperation,
  getBusinessOperationSubList,
  getCaseNoByBusinessNoBatch,
  saveBusinessData,
  startProcessInstance,
  startProcessInstanceSync,
}
