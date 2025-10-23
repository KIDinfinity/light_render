
import request from '@/utils/request';

export async function listByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/listByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryCaseManagementByProcessInstantIds(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/queryCaseManagementByProcessInstantIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryCaseNoByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/queryCaseNoByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDispatchFlowInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/queryDispatchFlowInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveCaseManagement(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/saveCaseManagement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerDispatchFlow(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/case/triggerDispatchFlow', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listByClaimNos,
  queryCaseManagementByProcessInstantIds,
  queryCaseNoByClaimNo,
  queryDispatchFlowInfo,
  save,
  saveCaseManagement,
  saveInformation,
  triggerDispatchFlow,
}
