// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/task/checkAddInfoPermission */
export async function checkAddInfoPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkAddInfoPermissionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/task/checkAddInfoPermission', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/countTaskByActivity */
export async function countTaskByActivity(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTaskCount>(
    '/api/bpm/task/countTaskByActivity',
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

/** 此处后端没有提供注释 POST /api/bpm/task/countTaskByStatus */
export async function countTaskByStatus(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTaskCount>('/api/bpm/task/countTaskByStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/findAssignee */
export async function findAssignee(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/bpm/task/findAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/findAssigneeAndTeam */
export async function findAssigneeAndTeam(
  body: API.AssignTaskVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPermissionTeamUserResultVO>(
    '/api/bpm/task/findAssigneeAndTeam',
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

/** 此处后端没有提供注释 POST /api/bpm/task/findAutoActivityTask */
export async function findAutoActivityTask(options?: { [key: string]: any }) {
  return request<API.ResultVOAutoTaskMonitorInfo>(
    '/api/bpm/task/findAutoActivityTask',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/findHistoryTask */
export async function findHistoryTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findHistoryTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListHistoricTaskInstance>(
    '/api/bpm/task/findHistoryTask',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/findLastAssigneeByActivity */
export async function findLastAssigneeByActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLastAssigneeByActivityParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/bpm/task/findLastAssigneeByActivity', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/findLatesTaskByCaseNo */
export async function findLatesTaskByCaseNo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatesTaskByCaseNo1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>(
    '/api/bpm/task/findLatesTaskByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/findSystemTaskByTaskId */
export async function findSystemTaskByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSystemTaskByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/task/findSystemTaskByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/task/getAutoActivityValueByClaimNo */
export async function getAutoActivityValueByClaimNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAutoActivityValueByClaimNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>(
    '/api/bpm/task/getAutoActivityValueByClaimNo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/getButtonList */
export async function listActivityButton1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listActivityButton1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActivityButton>(
    '/api/bpm/task/getButtonList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/getDefaultActivityCode */
export async function getDefaultActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDefaultActivityParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/task/getDefaultActivityCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/getSubmissionId */
export async function findSubmissionIdByProcessInstId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSubmissionIdByProcessInstIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/task/getSubmissionId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/getTask */
export async function getTask1(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>('/api/bpm/task/getTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/getTaskByBusinessNo */
export async function getTaskByBusinessNo(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>('/api/bpm/task/getTaskByBusinessNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/task/getTaskByBusinessNoV2 */
export async function getTaskByBusinessNoV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskByBusinessNoV2Params,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/api/bpm/task/getTaskByBusinessNoV2', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/getTaskByCaseNo */
export async function getTaskByCaseNo(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>('/api/bpm/task/getTaskByCaseNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/listAssigneesQuery */
export async function listAssigneesQuery(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAssigneesQueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPermissionUserInfoResultVO>(
    '/api/bpm/task/listAssigneesQuery',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/listAssigneesTaskNum */
export async function listAssigneesTaskNum1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAssigneesTaskNum1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMapStringObject>(
    '/api/bpm/task/listAssigneesTaskNum',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/listCompletedTask */
export async function listCompletedTask(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPagePrioritizedTaskDetailVO>(
    '/api/bpm/task/listCompletedTask',
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

/** 此处后端没有提供注释 POST /api/bpm/task/listCompletedTasks */
export async function listCompletedTasks(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPagePriorityActivityVO>(
    '/api/bpm/task/listCompletedTasks',
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

/** 此处后端没有提供注释 POST /api/bpm/task/listPrioritizedTaskDetails */
export async function listSortedTasksDetail(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPagePriorityActivityVO>(
    '/api/bpm/task/listPrioritizedTaskDetails',
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

/** 此处后端没有提供注释 POST /api/bpm/task/listTasks */
export async function listTasks(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageTaskDetail>('/api/bpm/task/listTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/listTasksHist */
export async function listTasksHist(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageTaskDetail>('/api/bpm/task/listTasksHist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/task/listTasksHistByTaskId */
export async function listTasksHistByTaskId(
  body: API.PageTaskDetail,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageTaskDetail>(
    '/api/bpm/task/listTasksHistByTaskId',
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

/** 此处后端没有提供注释 POST /api/bpm/task/loadActivityCategory */
export async function loadActivityCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loadActivityCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOActivityDetail>(
    '/api/bpm/task/loadActivityCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/task/lsActivitySLA */
export async function listActivitySlaHist1(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageActivitySLADetail>(
    '/api/bpm/task/lsActivitySLA',
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

/** 此处后端没有提供注释 POST /api/bpm/task/lsTaskSLA */
export async function listTaskSlaHist(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageTaskSLADetail>('/api/bpm/task/lsTaskSLA', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
