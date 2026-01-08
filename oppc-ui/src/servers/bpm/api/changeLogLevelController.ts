// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/opus/log/changeLogLevel */
export async function changeLogLevel(
  body: API.LogLevelVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/log/changeLogLevel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/log/changeLogLevelV2 */
export async function changeLogLevel1(
  body: API.CfgLogLevelVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/log/changeLogLevelV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/log/getLogConfigCache */
export async function getLogConfigCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLogConfigCacheParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOConcurrentHashMapStringLogExtendConfigVO>(
    '/api/opus/log/getLogConfigCache',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/opus/log/patchLogConfig */
export async function patchLogConfig(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/opus/log/patchLogConfig', {
    method: 'POST',
    ...(options || {}),
  });
}
