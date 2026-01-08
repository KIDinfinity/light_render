// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/checkUserIfOwnResources */
export async function checkUserOwnCreateCaseResource(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/resource/checkUserIfOwnResources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/filterAuthorityActivityButtons */
export async function filterAuthorityActivityButtons(
  body: API.RBACTaskButton,
  options?: { [key: string]: any },
) {
  return request<API.ActivityButtonVO[]>(
    '/rpc/rbac2/resource/filterAuthorityActivityButtons',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findAllUserGroupByCaseCategoryAndProcActKey */
export async function findAllUserGroupByCaseCategoryAndProcActKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserGroupByCaseCategoryAndProcActKeyParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGroupResultVO>(
    '/rpc/rbac2/resource/findAllUserGroupByCaseCategoryAndProcActKey',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findAllUserIdByCaseCategoryAndProcActKey */
export async function findAllUserIdByCaseCategoryAndProcActKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserIdByCaseCategoryAndProcActKeyParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/rpc/rbac2/resource/findAllUserIdByCaseCategoryAndProcActKey',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findLargerLevelUser */
export async function findLargerLevelUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findLargerLevelUserParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/resource/findLargerLevelUser', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findRelativeGroupAndUserInfo */
export async function findRelativeGroupAndUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelativeGroupAndUserInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.UserGroupDO[]>(
    '/rpc/rbac2/resource/findRelativeGroupAndUserInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findRelativeGroupAndUserInfoByVip */
export async function findRelativeGroupAndUserInfo1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRelativeGroupAndUserInfo1Params,
  options?: { [key: string]: any },
) {
  return request<API.UserGroupDO[]>(
    '/rpc/rbac2/resource/findRelativeGroupAndUserInfoByVip',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findSubmitGroupAndUserInfo */
export async function findSubmitGroupAndUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSubmitGroupAndUserInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGroupDO>(
    '/rpc/rbac2/resource/findSubmitGroupAndUserInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findSubmitGroupAndUserInfoV2 */
export async function findSubmitGroupAndUserInfoV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findSubmitGroupAndUserInfoV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGroupDO>(
    '/rpc/rbac2/resource/findSubmitGroupAndUserInfoV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findUserIdByPermission */
export async function findUserIdByPermission(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/resource/findUserIdByPermission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/getValidUserList */
export async function getValidUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getValidUserListParams,
  body: API.TaskInfoForPermission[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/rbac2/resource/getValidUserList',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    },
  );
}
