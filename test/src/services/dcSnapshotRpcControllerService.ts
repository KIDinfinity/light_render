
import request from '@/utils/request';

export async function deleteData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/deleteData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteSnapshotDataByTypes(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/deleteSnapshotDataByTypes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/queryData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDataByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/queryDataByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDataByList(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/queryDataByList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatchData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/saveBatchData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/saveData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateDataByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/snapshot/updateDataByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteData,
  deleteSnapshotDataByTypes,
  queryData,
  queryDataByCaseNo,
  queryDataByList,
  saveBatchData,
  saveData,
  updateDataByCaseNo,
}
