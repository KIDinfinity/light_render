// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/task/assignTask */
export async function assignTask(
  body: API.TaskAssignment,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/assignTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/batchAssignTask */
export async function batchAssignTask(
  body: API.TaskAssignment[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/batchAssignTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/batchAssignTaskV2 */
export async function batchAssignTaskV2(
  body: API.BatchAssignRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/task/batchAssignTaskV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/changeAssignee */
export async function changeAssignee(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeAssigneeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/changeAssignee', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/claimTask */
export async function claimTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.claimTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/claimTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/completeTask */
export async function completeTask3(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/deleteTask */
export async function deleteTask(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/deleteTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/task/getLastTask */
export async function getLastTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLastTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskResponse>('/api/bpm/task/task/getLastTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/validateMedicalCase */
export async function validateMedicalCase(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/bpm/task/validateMedicalCase',
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

/** 此处后端没有提供注释 POST /api/bpm/task/validateSubmission */
export async function validateSubmission1(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/validateSubmission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/validateSubmitAssignee */
export async function validateSubmitAssignee(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/task/validateSubmitAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
