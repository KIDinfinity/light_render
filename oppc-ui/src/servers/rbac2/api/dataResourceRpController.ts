// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/data/batchHigherLevelCheck */
export async function batchHigherLevelCheck(
  body: API.BatchHigherAuthorityBusinessData,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/resource/data/batchHigherLevelCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/data/higherLevelCheck */
export async function higherLevelCheck(
  body: API.HigherAuthorityBusinessData,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/rbac2/resource/data/higherLevelCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/data/isNeedHigherLevelCheck */
export async function isNeedHigherLevelCheck(
  body: API.HigherAuthority,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/rbac2/resource/data/isNeedHigherLevelCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/data/isVipUser */
export async function isVipUser(
  body: API.HigherAuthorityBusinessDataVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/rbac2/resource/data/isVipUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findDataResource */
export async function findByFunctionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByFunctionIdParams,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/rbac2/resource/findDataResource', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/rbac2/resource/findUserDataResource */
export async function findDataResource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findDataResourceParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListString>(
    '/rpc/rbac2/resource/findUserDataResource',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
