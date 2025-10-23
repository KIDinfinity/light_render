
import request from '@/utils/request';

export async function getUserByTaskId(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/getUserByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPendingInfo(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/listPendingInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function querySnapshotVersion(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/querySnapshotVersion', {
    // localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function snapshot(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/snapshot', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function switchTaskStatus(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/switchTaskStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getUserByTaskId,
  listPendingInfo,
  querySnapshotVersion,
  snapshot,
  switchTaskStatus,
}
