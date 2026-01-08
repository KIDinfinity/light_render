// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/management/bpm/process/activateProcessDefinition */
export async function activateProcessDefinition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.activateProcessDefinitionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessDefinitionResponse>(
    '/api/management/bpm/process/activateProcessDefinition',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/management/bpm/process/activity/deleteProcessAct */
export async function deleteProcessAct(
  body: API.ProcessActivity,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/activity/deleteProcessAct',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/activity/insertProcessAct */
export async function insertProcessAct(
  body: API.ProcessActivity,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/activity/insertProcessAct',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/activity/updateProcessAct */
export async function updateProcessAct(
  body: API.ProcessActivity,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/activity/updateProcessAct',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/deleteProcessDefType */
export async function deleteProcessDefineInfo(
  body: API.ProcessDefinition,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/deleteProcessDefType',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/findCaseCategoryListByBusinessCode */
export async function findCaseCategoryListByBusinessCode(
  body: API.ProcessDefinition,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/management/bpm/process/findCaseCategoryListByBusinessCode',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/getModelResource */
export async function getModelResource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getModelResourceParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/management/bpm/process/getModelResource', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/management/bpm/process/getProcessDefinition */
export async function getProcessDefinition1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessDefinition1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessDefinitionResponse>(
    '/api/management/bpm/process/getProcessDefinition',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/management/bpm/process/getProcessDefType */
export async function getProcessDefineType(options?: { [key: string]: any }) {
  return request<API.ResultVOListProcessDefinition>(
    '/api/management/bpm/process/getProcessDefType',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/management/bpm/process/getProcessInfoByOrgMemberList */
export async function getProcessInfoByOrgMember(
  body: API.ProcessDefinitionStatus,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserProcessDefinition>(
    '/api/management/bpm/process/getProcessInfoByOrgMemberList',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/insertProcessDefType */
export async function insertProcessDefineInfo(
  body: API.ProcessDefinition,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/insertProcessDefType',
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

/** 此处后端没有提供注释 POST /api/management/bpm/process/suspendProcessDefinition */
export async function suspendProcessDefinition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.suspendProcessDefinitionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessDefinitionResponse>(
    '/api/management/bpm/process/suspendProcessDefinition',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/management/bpm/process/updateProcessDefType */
export async function updateProcessDefineInfo(
  body: API.ProcessDefinition,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/bpm/process/updateProcessDefType',
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
