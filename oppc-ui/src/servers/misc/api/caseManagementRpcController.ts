// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/case/listByClaimNos */
export async function listCaseManagementByClaimNos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCaseManagementByClaimNosParams,
  options?: { [key: string]: any },
) {
  return request<API.NavigatorCaseManagementDO[]>(
    '/rpc/navigator/case/listByClaimNos',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/queryCaseManagementByProcessInstantIds */
export async function queryCaseManagementByProcessInstantIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCaseManagementByProcessInstantIdsParams,
  options?: { [key: string]: any },
) {
  return request<API.NavigatorCaseManagementDO[]>(
    '/rpc/navigator/case/queryCaseManagementByProcessInstantIds',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/queryCaseNoByClaimNo */
export async function queryCaseNoByClaimNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCaseNoByClaimNoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/navigator/case/queryCaseNoByClaimNo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/queryDispatchFlowInfo */
export async function queryDispatchFlowInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryDispatchFlowInfoParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/navigator/case/queryDispatchFlowInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/save */
export async function save(
  body: API.NavigatorCaseManagementDO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/case/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/saveCaseManagement */
export async function saveCaseManagement(
  body: API.ClaimCase,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/case/saveCaseManagement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/saveInformation */
export async function saveInformation1(
  body: API.InformationVO,
  options?: { [key: string]: any },
) {
  return request<API.InformationVO>('/rpc/navigator/case/saveInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/navigator/case/triggerDispatchFlow */
export async function triggerDispatchFlow(
  body: API.PendInfo,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/case/triggerDispatchFlow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
