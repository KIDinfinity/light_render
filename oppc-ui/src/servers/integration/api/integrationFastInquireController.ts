// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/getIntegrationConfigs */
export async function getIntegrationConfigs1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIntegrationConfigs1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationConfigsVO>(
    '/api/integration/v2/getIntegrationConfigs',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/getIntegrationConfigs2 */
export async function getIntegrationConfigs2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIntegrationConfigs2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationConfigsVO2>(
    '/api/integration/v2/getIntegrationConfigs2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/getIntegrationProcess */
export async function getIntegrationProcess(
  body: API.IntegrationProcessInquireVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIntegrationProcessVO>(
    '/api/integration/v2/getIntegrationProcess',
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
