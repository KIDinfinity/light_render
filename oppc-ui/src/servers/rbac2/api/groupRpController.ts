// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findAllByResourceCode */
export async function findAllByResourceCode(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.GroupResourceVO[]>(
    '/rpc/rbac2/group/findAllByResourceCode',
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

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findAllUserIdByGroupCode */
export async function findAllUserIdByGroupCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserIdByGroupCodeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/group/findAllUserIdByGroupCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findGroupByUserIdList */
export async function findGroupByUserIdList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findGroupByUserIdListParams,
  options?: { [key: string]: any },
) {
  return request<API.UserGroupVO[]>('/rpc/rbac2/group/findGroupByUserIdList', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findGroupProcessByUserId */
export async function findGroupProcessByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findGroupProcessByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.UserGroupProcessDO[]>(
    '/rpc/rbac2/group/findGroupProcessByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findRoleGroupByUserId */
export async function findRoleGroupByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRoleGroupByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.UserGroupDO[]>('/rpc/rbac2/group/findRoleGroupByUserId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/group/findTeamByUserId */
export async function findTeamByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findTeamByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.UserTeamVO[]>('/rpc/rbac2/group/findTeamByUserId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
