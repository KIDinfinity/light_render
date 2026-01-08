// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/resource/findAllActivityAuthority */
export async function findAllActivityAuthority(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActivityResourceDO>(
    '/api/rbac2/resource/findAllActivityAuthority',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findAuthActivityByRoleCodes */
export async function findAuthActivityByRoleCodes(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivityResourceVO>(
    '/api/rbac2/resource/findAuthActivityByRoleCodes',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findAuthActivityByRoleCodesV2 */
export async function findAuthActivityByRoleCodesV2(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListProcessActivity>(
    '/api/rbac2/resource/findAuthActivityByRoleCodesV2',
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

/** 此处后端没有提供注释 POST /api/rbac2/resource/findUserProcessByRoleId */
export async function findUserActivityByRole(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListActivityResourceDO>(
    '/api/rbac2/resource/findUserProcessByRoleId',
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
