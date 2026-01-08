// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/delete */
export async function delete5(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userGeneralInfo/delete',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/deleteBatch */
export async function deleteBatch3(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userGeneralInfo/deleteBatch',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/findById */
export async function getUserGeneralInfoById2(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInfoDO>(
    '/api/management/uc/userGeneralInfo/findById',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/findByUserId */
export async function getUserGeneralInfoByUserId2(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInfoDO>(
    '/api/management/uc/userGeneralInfo/findByUserId',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/findByUserIdList */
export async function findByUserIdList1(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/management/uc/userGeneralInfo/findByUserIdList',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/insert */
export async function insert4(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userGeneralInfo/insert',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/page */
export async function findUserGeneralInfoByPage1(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserGeneralInfoDO>(
    '/api/management/uc/userGeneralInfo/page',
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

/** 此处后端没有提供注释 POST /api/management/uc/userGeneralInfo/update */
export async function update6(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userGeneralInfo/update',
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
