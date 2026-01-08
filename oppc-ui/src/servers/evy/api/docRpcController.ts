// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/evy/doc/findLetterDocCfgByRegionCode */
export async function findLetterDocCfgByRegionCode(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListLetterDocConfigDO>(
    '/rpc/evy/doc/findLetterDocCfgByRegionCode',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/doc/getEnvoyBusinessProcess */
export async function getEnvoyBusinessProcess(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBusinessProcessVO>(
    '/rpc/evy/doc/getEnvoyBusinessProcess',
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

/** 此处后端没有提供注释 POST /rpc/evy/doc/listReasonGroupDocType */
export async function listReasonGroupDocType(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ReasonGroupDocType[]>(
    '/rpc/evy/doc/listReasonGroupDocType',
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

/** 此处后端没有提供注释 POST /rpc/evy/doc/lsLetterDocCfg */
export async function lsLetterDocCfg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.lsLetterDocCfgParams,
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListLetterDocConfigDO>(
    '/rpc/evy/doc/lsLetterDocCfg',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/evy/doc/receiveDocAndAutoResolve */
export async function receiveDocAndAutoResolve(
  body: API.DocInfoParam[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonDoc>(
    '/rpc/evy/doc/receiveDocAndAutoResolve',
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

/** 此处后端没有提供注释 POST /rpc/evy/doc/reindexDoc */
export async function reindexDoc(
  body: API.ReIndexDocVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/evy/doc/reindexDoc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/evy/doc/sendDocReceivedNotification */
export async function sendDocReceivedNotification(
  body: API.DocInfoParam[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/evy/doc/sendDocReceivedNotification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
