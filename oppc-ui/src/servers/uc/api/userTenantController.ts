// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/tenant/delete */
export async function delete3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete3Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/tenant/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/tenant/deleteAll */
export async function deleteAll(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/uc/tenant/deleteAll', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/uc/tenant/get */
export async function get1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.get1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserTenantInfo>('/api/uc/tenant/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/tenant/refresh */
export async function refresh(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/uc/tenant/refresh', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/tenant/save */
export async function save(
  body: API.UserTenantInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/tenant/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
