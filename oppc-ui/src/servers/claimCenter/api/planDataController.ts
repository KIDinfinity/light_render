// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/idGenerator/planData/deleteCache */
export async function deleteCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCacheParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOLong>('/api/idGenerator/planData/deleteCache', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/idGenerator/planData/getPlanIdGenerateCondition */
export async function getPlanIdGenerateCondition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanIdGenerateConditionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPlanIdGenerateCondition>(
    '/api/idGenerator/planData/getPlanIdGenerateCondition',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/idGenerator/planData/reloadV2 */
export async function reloadV2(
  body: API.PlanDataVO,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/idGenerator/planData/reloadV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
