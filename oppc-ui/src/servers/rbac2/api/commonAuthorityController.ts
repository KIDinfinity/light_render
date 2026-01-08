// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/evictAll */
export async function evictAll(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/rbac2/commonAuthority/evictAll', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getActiAuthorityAuthorityByUserId */
export async function getActiAuthorityAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActiAuthorityAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getActiAuthorityAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getCommAuthorityByUserId */
export async function getCommAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getCommAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getCommonAuthorityBySpecifiedUserId */
export async function getCommonAuthorityBySpecifiedUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommonAuthorityBySpecifiedUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getCommonAuthorityBySpecifiedUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getCommonAuthorityByUserId */
export async function getCommonAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommonAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getCommonAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getDashboardAuthorityByUserId */
export async function getDashboardAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDashboardAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getDashboardAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getInfoCategoryAuthorityByUserId */
export async function getInfoCategoryAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoCategoryAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getInfoCategoryAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getMenuAuthorityByUserId */
export async function getMenuAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getMenuAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/getReportAuthorityByUserId */
export async function getReportAuthorityByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReportAuthorityByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListAuthorityResultVO>(
    '/api/rbac2/commonAuthority/getReportAuthorityByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/commonAuthority/testCache */
export async function testCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testCacheParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/rbac2/commonAuthority/testCache', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
