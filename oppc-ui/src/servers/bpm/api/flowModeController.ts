// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/task/getErrorTasks */
export async function getErrorTasks(
  body: API.FlowModeTaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListFlowModeTask>('/api/bpm/task/getErrorTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/getOverDueTasks */
export async function getOverDueTasks(
  body: API.FlowModeTaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOverDueTask>('/api/bpm/task/getOverDueTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
