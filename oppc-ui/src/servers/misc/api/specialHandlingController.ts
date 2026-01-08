// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/special/handleCase */
export async function handleCase(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/special/handleCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/navigator/special/handleCasePresit */
export async function handleCasePresit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleCasePresitParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/special/handleCasePresit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
