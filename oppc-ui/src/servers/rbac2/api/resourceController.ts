// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/resource/checkUserIfOwnResource */
export async function checkUserOwnCreateCaseResource2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkUserOwnCreateCaseResource2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/rbac2/resource/checkUserIfOwnResource',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/resource/checkUserIfOwnResources */
export async function checkUserOwnCreateCaseResource1(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringBoolean>(
    '/api/rbac2/resource/checkUserIfOwnResources',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findActivityByRoles */
export async function findAllActivityByRole(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActivityResourceVO>(
    '/api/rbac2/resource/findActivityByRoles',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findByRoles */
export async function findByRoles(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListResourceDO>(
    '/api/rbac2/resource/findByRoles',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findLimitsByRoles */
export async function findLimitByRoles(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListDataResourceDO>(
    '/api/rbac2/resource/findLimitsByRoles',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findMaskByRoles */
export async function findMaskByRoles(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListDataMaskingDO>(
    '/api/rbac2/resource/findMaskByRoles',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/getAllDataMaskingCode */
export async function getAllDataMaskingCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllDataMaskingCodeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/api/rbac2/resource/getAllDataMaskingCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/resource/listCaseCategoryByUserId */
export async function listCaseCategoryByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCaseCategoryByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/rbac2/resource/listCaseCategoryByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/resource/listPermissionMenu */
export async function listPermissionMenuByUserId(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListString>(
    '/api/rbac2/resource/listPermissionMenu',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
