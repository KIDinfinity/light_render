// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/HttpPoolManager/closeExpiredConnections */
export async function closeExpiredConnections1(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/HttpPoolManager/closeExpiredConnections',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/HttpPoolManager/closeIdleConnections */
export async function closeExpiredConnections(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.closeExpiredConnectionsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/HttpPoolManager/closeIdleConnections',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/HttpPoolManager/getPoolConfig */
export async function getPoolConfig(options?: { [key: string]: any }) {
  return request<API.ResultVO>(
    '/api/integration/v2/HttpPoolManager/getPoolConfig',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/HttpPoolManager/updateConfig */
export async function updateConfig(
  body: API.ConnectionManagerConfigVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/v2/HttpPoolManager/updateConfig',
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
