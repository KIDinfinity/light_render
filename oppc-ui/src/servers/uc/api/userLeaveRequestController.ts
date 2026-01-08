// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/cancel */
export async function cancel(
  body: API.UserLeaveRequestNavigatorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leaveRequest/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/discardUserLeaveRequestDetail */
export async function discardUserLeaveRequestDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.discardUserLeaveRequestDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/uc/leaveRequest/discardUserLeaveRequestDetail',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getLeaveRequestUserInfo */
export async function getLeaveRequestUserInfo(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListLeaveRequestUserInfoVO>(
    '/api/uc/leaveRequest/getLeaveRequestUserInfo',
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

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getPersonalLeaveRequestInfo */
export async function getPersonalLeaveRequestInfo(
  body: API.PersonalLeaveRequestSearchArgVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPersonalLeaveRequestResultVO>(
    '/api/uc/leaveRequest/getPersonalLeaveRequestInfo',
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

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getTeamLeaveRequestInfo */
export async function getTeamLeaveRequestInfo(
  body: API.TeamLeaveRequestSearchArgVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListTeamLeaveRequestResultVO>(
    '/api/uc/leaveRequest/getTeamLeaveRequestInfo',
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

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getUserClassifiedLeaveRequestInfo */
export async function getUserClassifiedLeaveRequestInfo(
  body: API.UserLeaveRequestInfoQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserClassifiedLeaveRequestInfoVO>(
    '/api/uc/leaveRequest/getUserClassifiedLeaveRequestInfo',
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

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getUserDraftLeaveRequest */
export async function getUserDraftLeaveRequest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDraftLeaveRequestParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserLeaveRequestVO>(
    '/api/uc/leaveRequest/getUserDraftLeaveRequest',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/getUserLeaveRequestByCaseNo */
export async function getUserLeaveRequestByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserLeaveRequestByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserLeaveRequestVO>(
    '/api/uc/leaveRequest/getUserLeaveRequestByCaseNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/reject */
export async function reject(
  body: API.UserLeaveRequestNavigatorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leaveRequest/reject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/submit */
export async function submit(
  body: API.UserLeaveRequestNavigatorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leaveRequest/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leaveRequest/waivePersonalLeaveRequest */
export async function waivePersonalLeaveRequest(
  body: API.PersonalLeaveRequestSearchArgVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/uc/leaveRequest/waivePersonalLeaveRequest',
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
