// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/customization/findByUserId */
export async function findCustomizationByUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCustomizationByUserIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCustomizationVO>(
    '/api/uc/customization/findByUserId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/customization/update */
export async function update4(
  body: API.CustomizationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/customization/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
