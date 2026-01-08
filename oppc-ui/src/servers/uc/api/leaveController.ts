// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/leave/addLeave */
export async function addLeave(
  body: API.LeaveInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leave/addLeave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/deleteLeave */
export async function deleteLeave(
  body: API.LeaveInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leave/deleteLeave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/duration */
export async function duration(
  body: API.LeaveInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBigDecimal>('/api/uc/leave/duration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/findLeavePage */
export async function findLeavePage(
  body: API.PageLeaveInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageLeaveInfoDO>('/api/uc/leave/findLeavePage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/findTaskCountMemberList */
export async function findTaskCountMemberList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListMemberTaskDTO>(
    '/api/uc/leave/findTaskCountMemberList',
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

/** 此处后端没有提供注释 POST /api/uc/leave/getResourceCount */
export async function getResourceCount(
  body: API.ResourceCountQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegerArray>('/api/uc/leave/getResourceCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/overview */
export async function overview(
  body: API.LeaveOverviewQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListLeaveInfoDO>('/api/uc/leave/overview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/leave/updateLeave */
export async function updateLeave(
  body: API.LeaveInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/leave/updateLeave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
