// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/task/getUserByTaskId */
export async function getUserByTaskId(
  body: {
    taskId?: string;
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/navigator/task/getUserByTaskId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/task/listPendingInfo */
export async function listPendingInfo(
  body: API.TaskInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegratedPendInfoVO>(
    '/api/navigator/task/listPendingInfo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/task/querySnapshotVersion */
export async function querySnapshotVersion(
  body: API.SnapshotQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/task/querySnapshotVersion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/task/snapshot */
export async function snapshotTaskInfo(
  body: API.TaskInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/task/snapshot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/task/switchTaskStatus */
export async function switchTaskStatus(
  body: API.TaskStatusSwitchVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/task/switchTaskStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
