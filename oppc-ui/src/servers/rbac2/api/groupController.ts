// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/group/batchSaveUserGroups */
export async function updateDeletedByUserId1(
  body: API.UserGroupDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGroupRelationshipVO>(
    '/api/rbac2/group/batchSaveUserGroups',
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

/** 此处后端没有提供注释 POST /api/rbac2/group/findAllGroup */
export async function findAllGroup(options?: { [key: string]: any }) {
  return request<API.ResultVOListGroupDO>('/api/rbac2/group/findAllGroup', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/group/findAuthorityTeamUserGroupByUserId */
export async function findAuthorityTeamUserGroupByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAuthorityTeamUserGroupByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPermissionTeamVO>(
    '/api/rbac2/group/findAuthorityTeamUserGroupByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/group/findGroupByUserId */
export async function findGroupByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findGroupByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListGroupDO>(
    '/api/rbac2/group/findGroupByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/group/findUserGroupInformationByUserId */
export async function findUserGroupInformationByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUserGroupInformationByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/rbac2/group/findUserGroupInformationByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/rbac2/group/removeUserGroups */
export async function removeUserGroups(
  body: API.UserGroupDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserGroupRelationshipVO>(
    '/api/rbac2/group/removeUserGroups',
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

/** 此处后端没有提供注释 POST /api/rbac2/group/saveUserGroup */
export async function saveUserGroup(
  body: API.UserGroupDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/rbac2/group/saveUserGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/group/updateDeletedByUserId */
export async function updateDeletedByUserId(
  body: API.UserGroupDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/rbac2/group/updateDeletedByUserId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
