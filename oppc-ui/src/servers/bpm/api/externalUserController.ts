// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/externalUser/listByType */
export async function listExternalUsersByType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listExternalUsersByType1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExternalUser>(
    '/api/bpm/externalUser/listByType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
