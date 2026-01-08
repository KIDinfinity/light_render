// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/addFundPoint */
export async function addFundPoint(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userGeneralInfo/addFundPoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/delete */
export async function delete1(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userGeneralInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/deleteBatch */
export async function deleteBatch1(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userGeneralInfo/deleteBatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/find */
export async function getUserGeneralInfoById1(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/find',
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

/** 此处后端没有提供注释 GET /api/uc/userGeneralInfo/findAllForAssigneeUser */
export async function findAllForAssigneeUser(options?: { [key: string]: any }) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findAllForAssigneeUser',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/uc/userGeneralInfo/findAllTitle */
export async function findAllTitle(options?: { [key: string]: any }) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findAllTitle',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/uc/userGeneralInfo/findAllUser */
export async function findAllUser1(options?: { [key: string]: any }) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findAllUser',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/uc/userGeneralInfo/findAssigneeDropdownList */
export async function findAssigneeDropdownList(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findAssigneeDropdownList',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/findByUserId */
export async function getUserGeneralInfoByUserId1(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInfoVO>(
    '/api/uc/userGeneralInfo/findByUserId',
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

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/findByUserIdList */
export async function findByUserIdList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findByUserIdList',
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

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/findUserOrderByEmploymentDate */
export async function findUserOrderByEmploymentDate1(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/findUserOrderByEmploymentDate',
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

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/insert */
export async function insert1(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userGeneralInfo/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/page */
export async function findUserGeneralInfoByPage(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageUserGeneralInfoDO>(
    '/api/uc/userGeneralInfo/page',
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

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/queryByUserId */
export async function getUserGeneralInformationByUserId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGeneralInformationByUserId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInformationVO>(
    '/api/uc/userGeneralInfo/queryByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/subtractFundPoint */
export async function subtractFundPoint(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/uc/userGeneralInfo/subtractFundPoint',
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

/** 此处后端没有提供注释 POST /api/uc/userGeneralInfo/update */
export async function update2(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userGeneralInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
