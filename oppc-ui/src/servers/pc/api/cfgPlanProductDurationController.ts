// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planProductDuration/listPlanProductDuration */
export async function listPlanProductDuration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPlanProductDurationParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductDurationDO[]>(
    '/api/pc/planProductDuration/listPlanProductDuration',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductDuration/listPlanProductDurationByRegionAndRegenSiAge */
export async function listPlanProductDurationByRegionAndRegenSiAge(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPlanProductDurationByRegionAndRegenSiAgeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/pc/planProductDuration/listPlanProductDurationByRegionAndRegenSiAge',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductDuration/listPlanProductFeatureDurationForBase */
export async function listPlanProductFeatureDurationForBase(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPlanProductFeatureDurationForBaseParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDurationQO[]>(
    '/api/pc/planProductDuration/listPlanProductFeatureDurationForBase',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductDuration/listPlanProductFeatureDurationForRider */
export async function listPlanProductFeatureDurationForRider(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPlanProductFeatureDurationForRiderParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDurationQO[]>(
    '/api/pc/planProductDuration/listPlanProductFeatureDurationForRider',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
