// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/cc/completeTask */
export async function completeTask2(
  body: API.CCTaskParam,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/cc/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/cc/findAllPendingTask */
export async function findAllPendingTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllPendingTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.CCTaskInfoVO[]>('/rpc/bpm/cc/findAllPendingTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/cc/startAndComplete */
export async function startAndComplete(
  body: API.CCProcessParam,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/cc/startAndComplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
