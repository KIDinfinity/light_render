// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/delete */
export async function delete4(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/management/uc/userPersonalInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/deleteBatch */
export async function deleteBatch2(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/management/uc/userPersonalInfo/deleteBatch',
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

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/findById */
export async function findUserPersonalInfoById1(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserPersonalInfoDO>(
    '/api/management/uc/userPersonalInfo/findById',
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

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/findByUserId */
export async function findUserPersonalInfoByUserId3(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserPersonalInfoDO>(
    '/api/management/uc/userPersonalInfo/findByUserId',
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

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/insert */
export async function insert3(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userPersonalInfo/insert',
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

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/page */
export async function findPersonalInfoByPage(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserPersonalInfoDO>(
    '/api/management/uc/userPersonalInfo/page',
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

/** 此处后端没有提供注释 POST /api/management/uc/userPersonalInfo/update */
export async function update5(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/management/uc/userPersonalInfo/update',
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
