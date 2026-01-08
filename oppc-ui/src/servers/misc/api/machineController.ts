// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/misc/${param0}/${param1} */
export async function call(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.callParams,
  body: Record,
  options?: { [key: string]: any },
) {
  const { function: param0, operation: param1, ...queryParams } = params;
  return request<Record>(`/api/misc/${param0}/${param1}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/misc/machine/config/get */
export async function getMachineConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMachineConfigParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/misc/machine/config/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/machine/config/save */
export async function saveMachineConfig(
  body: API.MachineConfig,
  options?: { [key: string]: any },
) {
  return request<API.MachineConfig>('/api/misc/machine/config/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/machine/create/index */
export async function createIndex(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createIndexParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/misc/machine/create/index', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/misc/machine/listAllConfigKey */
export async function listAllConfigKey(options?: { [key: string]: any }) {
  return request<string[]>('/api/misc/machine/listAllConfigKey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/machine/poc */
export async function poc(body: Record, options?: { [key: string]: any }) {
  return request<Record>('/api/misc/machine/poc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/misc/machine/poc/v2 */
export async function pocV2(
  body: API.PocRequest,
  options?: { [key: string]: any },
) {
  return request<API.PocResponse>('/api/misc/machine/poc/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/misc/machine/query/logger */
export async function queryLogger(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryLoggerParams,
  options?: { [key: string]: any },
) {
  return request<API.CallerLogInfo[]>('/api/misc/machine/query/logger', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
