// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/systemsupport/assignTask */
export async function assignTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/systemsupport/assignTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/systemsupport/completeTask */
export async function completeTasks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.completeTasksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/systemsupport/completeTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/systemsupport/startProcessInstance */
export async function startProcessInstance2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startProcessInstance2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>(
    '/api/bpm/systemsupport/startProcessInstance',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
