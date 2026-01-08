// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/batchQueryCaseNo */
export async function queryCaseNo1(
  body: API.NavigatorCaseManagementDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/navigator/cases/batchQueryCaseNo',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/getClaimAppeal */
export async function getClaimAppeal(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClaimAppealParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOClaimAppealVO>(
    '/api/navigator/cases/getClaimAppeal',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/getClaimAppealCaseInfo */
export async function getClaimAppealCaseInfo(
  body: API.ClaimAppealVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListClaimAppealCaseInfoVO>(
    '/api/navigator/cases/getClaimAppealCaseInfo',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/getTask */
export async function getTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDetail>('/api/navigator/cases/getTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/listProcessInstancesHist */
export async function listProcessInstances(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageObject>(
    '/api/navigator/cases/listProcessInstancesHist',
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

/** 此处后端没有提供注释 POST /api/navigator/cases/lsActivitySLA */
export async function listActivitySlaHist(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageObject>('/api/navigator/cases/lsActivitySLA', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/queryBusinessNo */
export async function query(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVONavigatorCaseManagementDO>(
    '/api/navigator/cases/queryBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/cases/queryCaseNo */
export async function queryCaseNo(
  body: API.NavigatorCaseManagementDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/navigator/cases/queryCaseNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/cases/save */
export async function save1(
  body: API.NavigatorCaseManagementDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/navigator/cases/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
