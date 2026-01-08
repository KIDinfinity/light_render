// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/findProcessStatus */
export async function findProcessStatus1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findProcessStatus1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/findProcessStatus', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/processInstance/activateProcessInstance */
export async function activateProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInstance>(
    '/api/bpm/processInstance/activateProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/deleteProcessInstance */
export async function deleteProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/processInstance/deleteProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/getProcessInstance */
export async function getProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInstance>(
    '/api/bpm/processInstance/getProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/getProcessInstanceDiagram */
export async function getProcessInstanceDiagram(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOResponseEntityByteArray>(
    '/api/bpm/processInstance/getProcessInstanceDiagram',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/getProcessInstanceInfo */
export async function getProcessInstanceInfo(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/processInstance/getProcessInstanceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/processInstance/getProcessInstanceProgress */
export async function getProcessInstanceProgress(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/processInstance/getProcessInstanceProgress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/processInstance/listProcessInstances */
export async function listProcessInstances1(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/processInstance/listProcessInstances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/processInstance/listProcessInstancesHist */
export async function listProcessInstances2(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<any>('/api/bpm/processInstance/listProcessInstancesHist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/processInstance/startProcessInstance */
export async function startProcessInstance3(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/processInstance/startProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/startSyncProcessInstance */
export async function startSyncProcessInstance1(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/processInstance/startSyncProcessInstance',
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

/** 此处后端没有提供注释 POST /api/bpm/processInstance/suspendProcessInstance */
export async function suspendProcessInstance(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInstance>(
    '/api/bpm/processInstance/suspendProcessInstance',
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
