// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/management/uc/organization/delete */
export async function delete6(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/management/uc/organization/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/management/uc/organization/deleteBatch */
export async function deleteBatch4(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/management/uc/organization/deleteBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/management/uc/organization/find */
export async function findOrganizationById1(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOOrganizationDO>(
    '/api/management/uc/organization/find',
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

/** 此处后端没有提供注释 POST /api/management/uc/organization/insert */
export async function insert5(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/management/uc/organization/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/management/uc/organization/page */
export async function findOrganizationByPage1(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageOrganizationDO>(
    '/api/management/uc/organization/page',
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

/** 此处后端没有提供注释 POST /api/management/uc/organization/update */
export async function update7(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/management/uc/organization/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
