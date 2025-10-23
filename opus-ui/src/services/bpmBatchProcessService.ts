
import request from '@/utils/request';

export async function assignBatchProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/assignBatchProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function bundleToBatchProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/bundleToBatchProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatchProcessByNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/deleteBatchProcessByNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatchProcessListByNo(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/deleteBatchProcessListByNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSingleBatchProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/getSingleBatchProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAllBatchProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/listAllBatchProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function scanSyncAllBatchProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/batchProcess/scanSyncAllBatchProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  assignBatchProcess,
  bundleToBatchProcess,
  deleteBatchProcessByNo,
  deleteBatchProcessListByNo,
  getSingleBatchProcess,
  listAllBatchProcess,
  scanSyncAllBatchProcess,
}
