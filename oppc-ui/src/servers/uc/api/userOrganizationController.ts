// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userOrganization/findByUserId */
export async function findUserOrganizationByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUserOrganizationByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserOrganizationVO>(
    '/api/uc/userOrganization/findByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/userOrganization/findOrganizationListByOrganizationCodeList */
export async function findOrganizationListByOrganizationCodeList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.OrganizationDO[]>(
    '/api/uc/userOrganization/findOrganizationListByOrganizationCodeList',
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

/** 此处后端没有提供注释 POST /api/uc/userOrganization/findUserOrganizationByUserIdList */
export async function findUserOrganizationByUserIdList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.UserOrganizationDO[]>(
    '/api/uc/userOrganization/findUserOrganizationByUserIdList',
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

/** 此处后端没有提供注释 POST /api/uc/userOrganization/update */
export async function update1(
  body: API.UserOrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userOrganization/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
