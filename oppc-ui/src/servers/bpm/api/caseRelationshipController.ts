// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/cancelRelationship */
export async function cancelRelationship(
  body: API.CaseRelationship[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/relationship/cancelRelationship', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/findByBusinessNo */
export async function findByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.CaseRelationshipRecord[]>(
    '/rpc/bpm/relationship/findByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/findByProcessInstanceId */
export async function findByProcessInstanceId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByProcessInstanceIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCaseRelationship>(
    '/rpc/bpm/relationship/findByProcessInstanceId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/findByRelatedBusinessNo */
export async function findByRelatedBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRelatedBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.CaseRelationshipRecord[]>(
    '/rpc/bpm/relationship/findByRelatedBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/findRelationshipRecords */
export async function findRelationshipRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelationshipRecordsParams,
  options?: { [key: string]: any },
) {
  return request<API.CaseRelationshipRecord[]>(
    '/rpc/bpm/relationship/findRelationshipRecords',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/handleAndSaveCaseRelation */
export async function handleAndSaveCaseRelation(
  body: API.CaseRelationship[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/relationship/handleAndSaveCaseRelation',
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

/** 此处后端没有提供注释 POST /rpc/bpm/relationship/saveCaseRelationship */
export async function buildCaseRelationship(
  body: API.CaseRelationship[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/bpm/relationship/saveCaseRelationship',
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
