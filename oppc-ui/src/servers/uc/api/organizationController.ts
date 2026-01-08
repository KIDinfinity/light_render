// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/organization/find */
export async function findOrganizationById(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOOrganizationDO>('/api/uc/organization/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/organization/findMicroInfoByUserId */
export async function findMicroInfoByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMicroInfoByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSetOrganizationMicroVO>(
    '/api/uc/organization/findMicroInfoByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationByOwner */
export async function findOrganizationByOwner(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationVO>(
    '/api/uc/organization/findOrganizationByOwner',
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

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationByOwnerId */
export async function findOrganizationByOwnerId(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/findOrganizationByOwnerId',
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

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationByParentCode */
export async function findOrganizationByParentCode(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/findOrganizationByParentCode',
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

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationByUserId */
export async function findOrganizationByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOrganizationByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/findOrganizationByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationInMyTask */
export async function findOrganizationInMyTask(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/findOrganizationInMyTask',
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

/** 此处后端没有提供注释 POST /api/uc/organization/findOrganizationModule */
export async function findOrganizationModule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOrganizationModuleParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationModuleDO>(
    '/api/uc/organization/findOrganizationModule',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/organization/page */
export async function findOrganizationByPage(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageOrganizationDO>('/api/uc/organization/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/organization/treeFindOrganization */
export async function findTreeOrganization(options?: { [key: string]: any }) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/treeFindOrganization',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/organization/treeFindOrganizationByOwner */
export async function findTreeByOwner(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationVO>(
    '/api/uc/organization/treeFindOrganizationByOwner',
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

/** 此处后端没有提供注释 POST /api/uc/organization/treeFindOrganizationByUserId */
export async function findTreeByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTreeByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListOrganizationDO>(
    '/api/uc/organization/treeFindOrganizationByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/organization/treeFindOrganizationMembersByCode */
export async function findOrganizationMembers(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSetUserGeneralInfoDO>(
    '/api/uc/organization/treeFindOrganizationMembersByCode',
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
