
import request from '@/utils/request';

export async function executeActivitySla(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/sync/case/executeActivitySla', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function executeSyncBusinessData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/sync/case/executeSyncBusinessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function executeSyncCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/sync/case/executeSyncCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function executeSyncCaseByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/sync/case/executeSyncCaseByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  executeActivitySla,
  executeSyncBusinessData,
  executeSyncCase,
  executeSyncCaseByCaseNo,
}
