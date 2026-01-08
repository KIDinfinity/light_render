// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userCertificate/delete */
export async function delete2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userCertificate/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userCertificate/deleteByUserId */
export async function deleteByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userCertificate/deleteByUserId', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/userCertificate/findByUserId */
export async function queryByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserCertificateDO>(
    '/api/uc/userCertificate/findByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/userCertificate/insert */
export async function insert2(
  body: API.UserCertificateDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/userCertificate/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
