// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/ph/pos/process/assignTask */
export async function assignTask1(
  body: API.TaskAssignment,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/ph/pos/process/assignTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/ph/pos/process/completeTask */
export async function completeTask6(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/ph/pos/process/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/ph/pos/process/startProcessInstance */
export async function startProcessInstance4(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/ph/pos/process/startProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/ph/pos/process/startProcessInstanceSync */
export async function startProcessSynchronization1(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/ph/pos/process/startProcessInstanceSync',
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
