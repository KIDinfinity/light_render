// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/getJsonMappingType */
export async function getJsonMappingType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getJsonMappingTypeParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/integration/v2/getJsonMappingType', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
