// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/functional/relationship/getRelatedUser */
export async function getRelatedUser1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRelatedUser1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgUserFunctionalRelationshipVO[]>(
    '/api/uc/functional/relationship/getRelatedUser',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
