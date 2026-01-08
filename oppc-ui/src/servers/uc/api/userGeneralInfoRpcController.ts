// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/advancedQuery */
export async function advancedQuery(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.PageUserInquiryDO>(
    '/rpc/uc/userGeneralInfo/advancedQuery',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/find */
export async function getUserGeneralInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGeneralInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.UserGeneralInfoDO>('/rpc/uc/userGeneralInfo/find', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findAllUser */
export async function findAllUser(options?: { [key: string]: any }) {
  return request<API.UserGeneralInfoDO[]>(
    '/rpc/uc/userGeneralInfo/findAllUser',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findByRoleCode */
export async function listUserInfoByRoleCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInfoByRoleCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.UserInquiryDO[]>(
    '/rpc/uc/userGeneralInfo/findByRoleCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findByUserId */
export async function getUserGeneralInfoByUserId(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.UserGeneralInfoVO>(
    '/rpc/uc/userGeneralInfo/findByUserId',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findByUserIdList */
export async function findUserGeneralInfoByUserIdList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.UserGeneralInfoDO[]>(
    '/rpc/uc/userGeneralInfo/findByUserIdList',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findByUserIdV2 */
export async function getUserGeneralInfoByUserIdV2(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInfoVO>(
    '/rpc/uc/userGeneralInfo/findByUserIdV2',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findLanguageByUserId */
export async function getUserLanguageByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserLanguageByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/uc/userGeneralInfo/findLanguageByUserId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findUserOrderByEmploymentDate */
export async function findUserOrderByEmploymentDate(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.UserGeneralInfoDO[]>(
    '/rpc/uc/userGeneralInfo/findUserOrderByEmploymentDate',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/findUserOrderByEmploymentDateWrapper */
export async function findUserOrderByEmploymentDateWrapper(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGeneralInfoDO>(
    '/rpc/uc/userGeneralInfo/findUserOrderByEmploymentDateWrapper',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/forceOfflineTerminatedUser */
export async function forceOfflineTerminatedUser(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<boolean>(
    '/rpc/uc/userGeneralInfo/forceOfflineTerminatedUser',
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

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/isTerminatedUser */
export async function isTerminatedUser(
  body: API.UserGeneralInfoDO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/uc/userGeneralInfo/isTerminatedUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/userGeneralInfo/queryByUserId */
export async function getUserGeneralInformationByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGeneralInformationByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGeneralInformationVO>(
    '/rpc/uc/userGeneralInfo/queryByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
