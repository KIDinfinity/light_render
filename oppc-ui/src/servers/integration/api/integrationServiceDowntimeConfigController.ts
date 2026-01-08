// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/serviceDowntimeConfig/asynDisposRequest */
export async function asynDisposRequestTest(options?: { [key: string]: any }) {
  return request<string[]>(
    '/api/integration/v2/serviceDowntimeConfig/asynDisposRequest',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/serviceDowntimeConfig/isMeetDowntime */
export async function isMeet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isMeet1Params,
  options?: { [key: string]: any },
) {
  return request<boolean>(
    '/api/integration/v2/serviceDowntimeConfig/isMeetDowntime',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/serviceDowntimeConfig/queryWeekDowntimeConfig */
export async function queryWeekDowntimeConfig(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListMapStringObject>(
    '/api/integration/v2/serviceDowntimeConfig/queryWeekDowntimeConfig',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/serviceDowntimeConfig/updateWeekDowntimeConfig */
export async function updateWeekDowntimeConfig(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/v2/serviceDowntimeConfig/updateWeekDowntimeConfig',
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
