// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v3/integration/poc */
export async function integrationPoc(
  body: API.IntegrationPocRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/integration/v3/integration/poc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v3/queryInterfaceList */
export async function queryConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/integration/v3/queryInterfaceList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
