// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/dataPatch/updateJobForLivingDeathClaim */
export async function findExtraFunctionsByGroupId1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findExtraFunctionsByGroupId1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/evy/dataPatch/updateJobForLivingDeathClaim',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
