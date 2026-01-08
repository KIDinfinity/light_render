// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/evy/config/listCaseReasonConfigs */
export async function listCaseReasonConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCaseReasonConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupConfigVO>(
    '/api/evy/config/listCaseReasonConfigs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/evy/config/listCaseReasonGroupConfigs */
export async function listCaseReasonGroupConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCaseReasonGroupConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupConfigVO>(
    '/api/evy/config/listCaseReasonGroupConfigs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/evy/config/listConfigs */
export async function listConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupConfigVO>(
    '/api/evy/config/listConfigs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/evy/config/listEnvoyBatchSendConfig */
export async function listEnvoyBatchSendConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEnvoyBatchSendConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListEnvoyBatchSendConfigDO>(
    '/api/evy/config/listEnvoyBatchSendConfig',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
