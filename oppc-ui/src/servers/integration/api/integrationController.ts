// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/asyncStart */
export async function asyncStartIntegration(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/asyncStart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/businessCaseSubmit */
export async function businessCaseSubmit(
  body: API.IntegrationExceptionHandlingDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationResponseVOObject>(
    '/api/integration/v2/businessCaseSubmit',
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

/** 此处后端没有提供注释 POST /api/integration/v2/callBack */
export async function callBack(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationResponseVOObject>(
    '/api/integration/v2/callBack',
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

/** 此处后端没有提供注释 POST /api/integration/v2/checkApplicable */
export async function checkApplicable(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/integration/v2/checkApplicable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/findInterfaceCallStatusList */
export async function findInterfaceCallStatusList(
  body: API.InterfaceCallStatusDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListInterfaceCallStatusDO>(
    '/api/integration/v2/findInterfaceCallStatusList',
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

/** 此处后端没有提供注释 POST /api/integration/v2/getKafkaResponse */
export async function localKafkaMockResponseV21(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/v2/getKafkaResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/loadIntegrationContext */
export async function loadIntegrationContext(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loadIntegrationContextParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationContextV2>(
    '/api/integration/v2/loadIntegrationContext',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/v2/reNameProcessTable */
export async function reNameProcessTable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reNameProcessTableParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/reNameProcessTable', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/v2/start */
export async function startIntegration(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationResponseVOObject>(
    '/api/integration/v2/start',
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

/** 此处后端没有提供注释 POST /api/integration/v2/updateExchangeRate */
export async function updateExchangeRate(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/v2/updateExchangeRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
