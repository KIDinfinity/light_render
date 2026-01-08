// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/autoRule/asynSaveStpReport */
export async function asynSaveStpReport(
  body: API.RuleStpReportDO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/autoRule/asynSaveStpReport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/execute */
export async function execute(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.executeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/autoRule/execute', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getAdminRuleResult */
export async function getAdminRuleResult(
  body: string,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/autoRule/getAdminRuleResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getAssigneeByTeam */
export async function getAssigneeByTeam(
  body: API.AssignTeamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/autoRule/getAssigneeByTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getAutoDecision */
export async function getAutoDecision(
  body: string,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/autoRule/getAutoDecision', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getCompleteTaskAssignee */
export async function getCompleteTaskAssignee(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/autoRule/getCompleteTaskAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getCompleteTaskAssigneeV2 */
export async function getCompleteTaskAssigneeV2(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAssignResult>(
    '/rpc/autoRule/getCompleteTaskAssigneeV2',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/getCreateCaseAssignee */
export async function getStartProcessAssignee(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/autoRule/getCreateCaseAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/getCreateCaseAssigneeV2 */
export async function getStartProcessAssigneeV2(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAssignResult>(
    '/rpc/autoRule/getCreateCaseAssigneeV2',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/getPostQcRuleResult */
export async function getPostQcRuleResult(
  body: API.PostQcRuleArg,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPostQcRuleArg>(
    '/rpc/autoRule/getPostQcRuleResult',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/getRuleExecuteResultByRuleType */
export async function getRuleExecuteResultByRuleType(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVORuleCommonRpcArgVO>(
    '/rpc/autoRule/getRuleExecuteResultByRuleType',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/getStpCheckingResult */
export async function getStpCheckingResult(
  body: API.StpCheckingRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOStpCheckingResponseVO>(
    '/rpc/autoRule/getStpCheckingResult',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/getWakeUpAssignee */
export async function getWakeUpAssignee(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/autoRule/getWakeUpAssignee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/autoRule/manualAssignValidate */
export async function manualAssignValidate(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAutoRuleResponseVO>(
    '/rpc/autoRule/manualAssignValidate',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/processReAssignee */
export async function processReAssignee(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOAutoRuleResponseVO>(
    '/rpc/autoRule/processReAssignee',
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

/** 此处后端没有提供注释 POST /rpc/autoRule/selectTaskToUserFromUnassignedTask */
export async function selectTaskFromUnassignedTask(
  body: API.UserAssignVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserAssignResult>(
    '/rpc/autoRule/selectTaskToUserFromUnassignedTask',
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
