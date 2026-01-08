// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/delete */
export async function deleteUsingPost(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/userPersonalInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/deleteBatch */
export async function deleteBatch(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/userPersonalInfo/deleteBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/findById */
export async function findUserPersonalInfoById(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserPersonalInfoDO>(
    '/api/uc/userPersonalInfo/findById',
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

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/findByUserId */
export async function findUserPersonalInfoByUserId2(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserPersonalInfoDO>(
    '/api/uc/userPersonalInfo/findByUserId',
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

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/insert */
export async function insert(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userPersonalInfo/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/page */
export async function findUserPersonalInfoByPage(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserPersonalInfoDO>(
    '/api/uc/userPersonalInfo/page',
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

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/update */
export async function update(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userPersonalInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userPersonalInfo/updateByUserId */
export async function updateByUserId(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userPersonalInfo/updateByUserId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
