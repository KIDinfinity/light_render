// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/task/autoUnPend */
export async function autoUnPend(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.autoUnPendParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskInfo>('/rpc/bpm/task/autoUnPend', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/checkTask */
export async function checkTask(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>('/rpc/bpm/task/checkTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/completeTask */
export async function completeTask1(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/endCaseForBoSkip */
export async function endCaseForBoSkip(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/endCaseForBoSkip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findAllManualTaskByCaseNo */
export async function findAllLastManualTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllLastManualTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/findAllManualTaskByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findAssigneeByCaseNo */
export async function findPosAssigneeByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPOSAssigneeByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/bpm/task/findAssigneeByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findAssigneeByProcInstId */
export async function findAssigneeByProcessInstId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAssigneeByProcessInstIdParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/findAssigneeByProcInstId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findByBusinessNoAndCastCategory */
export async function findByBusinessNoAndCastCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByBusinessNoAndCastCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess>(
    '/rpc/bpm/task/findByBusinessNoAndCastCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLastManualTaskByCaseNo */
export async function findLastManualTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLastManualTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/findLastManualTaskByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLastTaskByTaskId */
export async function findLastTaskByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLastTaskByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/findLastTaskByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLatestActivityAssigneeByBusinessNo */
export async function findLatestActivityAssigneeByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatestActivityAssigneeByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/rpc/bpm/task/findLatestActivityAssigneeByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLatesTaskByCaseNo */
export async function findLatesTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatesTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/findLatesTaskByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLatesTaskByInquiryBusinessNo */
export async function findLatesTaskByInquiryBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatesTaskByInquiryBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/findLatesTaskByInquiryBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLatesTaskByProcessInstId */
export async function findLatesTaskByProcessInstId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLatesTaskByProcessInstIdParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/findLatesTaskByProcessInstId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findLatestTasksByCaseNo */
export async function findLatestTasksByCaseNo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTaskDetail>(
    '/rpc/bpm/task/findLatestTasksByCaseNo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskByBusinessNo */
export async function findTaskByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/findTaskByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskCountByUserAndStatus */
export async function findTaskCountByUserAndStatus1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskCountByUserAndStatus1Params,
  options?: { [key: string]: any },
) {
  return request<API.TaskCount[]>(
    '/rpc/bpm/task/findTaskCountByUserAndStatus',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskDetailsByInitData */
export async function findTaskDetailsByInitData(
  body: API.StatsInitDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTaskDetail>(
    '/rpc/bpm/task/findTaskDetailsByInitData',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskLinkedUserByUserIdList */
export async function findTaskCountByUserAndStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskCountByUserAndStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.ActRuTaskVariableVO[]>(
    '/rpc/bpm/task/findTaskLinkedUserByUserIdList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findTaskListByProcInstId */
export async function findTaskListByProcInstId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskListByProcInstIdParams,
  options?: { [key: string]: any },
) {
  return request<API.AutoRuleTaskVO[]>(
    '/rpc/bpm/task/findTaskListByProcInstId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/findUserIdByTaskId */
export async function findUserIdByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUserIdByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ActRuVariableVO[]>('/rpc/bpm/task/findUserIdByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getActivityEarliestCompleteTime */
export async function getActivityEarliestCompleteTime(
  body: API.ActivityCompleteTimeQO,
  options?: { [key: string]: any },
) {
  return request<API.ActivityCompleteTimeDO[]>(
    '/rpc/bpm/task/getActivityEarliestCompleteTime',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/getActivityStatusByProcInstId */
export async function getActivityStatusByProcInstId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityStatusByProcInstIdParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>(
    '/rpc/bpm/task/getActivityStatusByProcInstId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getActivityStatusByTaskId */
export async function getActivityStatusByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityStatusByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getActivityStatusByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getActivityTaskList */
export async function getActivityTaskList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityTaskListParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/getActivityTaskList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getButtonList */
export async function listActivityButton(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listActivityButtonParams,
  options?: { [key: string]: any },
) {
  return request<API.ActivityButton[]>('/rpc/bpm/task/getButtonList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentAssigneeByBusinessNo */
export async function getCurrentAssigneeByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentAssigneeByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getCurrentAssigneeByBusinessNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentCaseAndTaskInfoByCaseNo */
export async function getCurrentCaseAndTaskInfoByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentCaseAndTaskInfoByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>(
    '/rpc/bpm/task/getCurrentCaseAndTaskInfoByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskByCaseNo */
export async function getCurrentTaskByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTaskByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getCurrentTaskByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskByCaseNos */
export async function getCurrentTaskByCaseNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/getCurrentTaskByCaseNos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskByTaskId */
export async function getCurrentTaskByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTaskByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getCurrentTaskByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskByTaskIdList */
export async function getCurrentTaskByTaskIdList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/bpm/task/getCurrentTaskByTaskIdList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskByTaskIdV2 */
export async function getCurrentTaskByTaskIdV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTaskByTaskIdV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>(
    '/rpc/bpm/task/getCurrentTaskByTaskIdV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskIdByBusinessNo */
export async function getCurrentTaskIdByBusinessNo(
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getCurrentTaskIdByBusinessNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskIdByCaseNo */
export async function getCurrentTaskIdByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTaskIdByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/bpm/task/getCurrentTaskIdByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getCurrentTaskSlaByCaseNo */
export async function getCurrentTaskSlaByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTaskSlaByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getCurrentTaskSlaByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getLastAssigneeOfSameActivity */
export async function getLastAssigneeOfSameActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLastAssigneeOfSameActivityParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getLastAssigneeOfSameActivity', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getLastAssigneeOfSameActivityByBusinessNo */
export async function getLastAssigneeOfSameActivityByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLastAssigneeOfSameActivityByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/rpc/bpm/task/getLastAssigneeOfSameActivityByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getLatestAssigneeByCaseNo */
export async function getLatestAssigneeByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestAssigneeByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getLatestAssigneeByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getLatestAssigneeByCaseNoAndActivityKey */
export async function getLatestAssigneeByCaseNoAndActivityKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestAssigneeByCaseNoAndActivityKeyParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/rpc/bpm/task/getLatestAssigneeByCaseNoAndActivityKey',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getLatestAssigneeByCaseNoV2 */
export async function getLatestAssigneeByCaseNoV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLatestAssigneeByCaseNoV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/rpc/bpm/task/getLatestAssigneeByCaseNoV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getQcPassDate */
export async function getQcPassDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQcPassDateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOLong>('/rpc/bpm/task/getQcPassDate', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getRegisterTask */
export async function getRegisterTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRegisterTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.RegisterTask>('/rpc/bpm/task/getRegisterTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getSubmissionChannelByCaseNo */
export async function getSubmissionChannelByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSubmissionChannelByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getSubmissionChannelByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getSystemTask */
export async function getSystemTask(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getSystemTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTask */
export async function getTask(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskAssigneeByTaskId */
export async function getTaskAssigneeByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskAssigneeByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/getTaskAssigneeByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskByTaskId */
export async function getTaskByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail>('/rpc/bpm/task/getTaskByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskDetailByBusinessNoList */
export async function getTaskDetailByBusinessNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>(
    '/rpc/bpm/task/getTaskDetailByBusinessNoList',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskDetailByBusinessNos */
export async function getTaskDetailByBusinessNos(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/getTaskDetailByBusinessNos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskIdByCaseNo */
export async function findTaskIdByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTaskIdByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/getTaskIdByCaseNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/getTaskIdListByApplicationNosAndTaskDefKeys */
export async function getTaskIdListByApplicationNosAndTaskDefKeys(
  body: API.TaskQueryRequestVo,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/bpm/task/getTaskIdListByApplicationNosAndTaskDefKeys',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/isCurrentTaskByTaskId */
export async function isCurrentTaskByTaskId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isCurrentTaskByTaskIdParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/task/isCurrentTaskByTaskId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listAssigneesTaskNum */
export async function listAssigneesTaskNum(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAssigneesTaskNumParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMapStringObject>(
    '/rpc/bpm/task/listAssigneesTaskNum',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listIntegratedPendInfo */
export async function listIntegratedPendInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listIntegratedPendInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.IntegratedPendInfoVO>(
    '/rpc/bpm/task/listIntegratedPendInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listLatestTasksByBusinessNo */
export async function listLatestTasksByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listLatestTasksByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>(
    '/rpc/bpm/task/listLatestTasksByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listRunningTaskDetails */
export async function listRunningTaskDetails(options?: { [key: string]: any }) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/listRunningTaskDetails', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listTaskByClaimNos */
export async function listTaskByClaimNos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTaskByClaimNosParams,
  options?: { [key: string]: any },
) {
  return request<API.AutoRuleTaskVO[]>('/rpc/bpm/task/listTaskByClaimNos', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listTaskByPolicyNo */
export async function listTaskByPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTaskByPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.AutoRuleTaskVO[]>('/rpc/bpm/task/listTaskByPolicyNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listTaskDetailByCaseNo */
export async function listTaskDetailByCaseNo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTaskDetail>(
    '/rpc/bpm/task/listTaskDetailByCaseNo',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/listTasksByCaseNoList */
export async function listTasksByCaseNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.TaskDetail[]>('/rpc/bpm/task/listTasksByCaseNoList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listUsersWithCurrentTaskAmount */
export async function listUsersWithCurrentTaskAmount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersWithCurrentTaskAmountParams,
  options?: { [key: string]: any },
) {
  return request<API.User[]>('/rpc/bpm/task/listUsersWithCurrentTaskAmount', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/listUsersWithTotalTaskAmount */
export async function listUsersWithTotalTaskAmount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsersWithTotalTaskAmountParams,
  options?: { [key: string]: any },
) {
  return request<API.User[]>('/rpc/bpm/task/listUsersWithTotalTaskAmount', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/logPendingTaskTrack */
export async function logTaskTrack1(
  body: API.TaskTrackDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/logPendingTaskTrack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/logTaskTrack */
export async function logTaskTrack(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logTaskTrackParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/task/logTaskTrack', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/lsActivitySLA */
export async function listActivitySlaHist(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.PageActivitySLADetail>('/rpc/bpm/task/lsActivitySLA', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/pagePendInfo */
export async function pagePendInfo(
  body: API.PagePendInfo,
  options?: { [key: string]: any },
) {
  return request<API.Page>('/rpc/bpm/task/pagePendInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/pendTask */
export async function pendTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pendTaskParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/pendTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/pendTaskV2 */
export async function pendTaskV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pendTaskV2Params,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/pendTaskV2', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/resumeTask */
export async function resumeTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resumeTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/task/resumeTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/resumeTaskWithActionType */
export async function resumeTaskWithActionType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resumeTaskWithActionTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/task/resumeTaskWithActionType', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/sendPending */
export async function sendPending(
  body: API.PendInfo,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/bpm/task/sendPending', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/submitQCPermissionValidation */
export async function submitQcPermissionValidation(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/bpm/task/submitQCPermissionValidation',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/submitSameAssigneePermissionValidation */
export async function submitSameAssigneePermissionValidation(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/rpc/bpm/task/submitSameAssigneePermissionValidation',
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

/** 此处后端没有提供注释 POST /rpc/bpm/task/syncCompleteTask */
export async function syncCompleteTask(
  body: API.TaskParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/syncCompleteTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/testTriggerInquiryBusiness */
export async function test(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/testTriggerInquiryBusiness', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/transferTaskTrack */
export async function transferTaskTrack(
  body: API.TransferTaskTrackVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/bpm/task/transferTaskTrack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/triggerTLICCheck */
export async function triggerTlicCheck(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerTLICCheckParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/task/triggerTLICCheck', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/updateAssessmentType */
export async function updateAssessmentType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAssessmentTypeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/task/updateAssessmentType', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/task/validateSubmission */
export async function validateSubmission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.validateSubmissionParams,
  options?: { [key: string]: any },
) {
  return request<API.ValidatedResultVO>('/rpc/bpm/task/validateSubmission', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
