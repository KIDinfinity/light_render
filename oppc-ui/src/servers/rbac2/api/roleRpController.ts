// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/role/findAllUserIdByResourceCode */
export async function findAllUserIdByResourceCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserIdByResourceCodeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/role/findAllUserIdByResourceCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/role/findAllUserIdByResourceValues */
export async function findAllUserIdByResourceValues(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserIdByResourceValuesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/rpc/rbac2/role/findAllUserIdByResourceValues',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/rbac2/role/findAllUserIdByRoleCode */
export async function findAllUserIdByRoleCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllUserIdByRoleCodeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/role/findAllUserIdByRoleCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/role/listRoleCodesByUserId */
export async function listRoleCodesByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRoleCodesByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/rbac2/role/listRoleCodesByUserId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/role/mapListGroupNamesByUserIds */
export async function mapListGroupNamesByUserIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mapListGroupNamesByUserIdsParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/role/mapListGroupNamesByUserIds', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/role/mapListRoleNamesByUserIds */
export async function mapListRoleNamesByUserIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mapListRoleNamesByUserIdsParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/role/mapListRoleNamesByUserIds', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
