// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planProductCenterFeature/deleteByProductCodes */
export async function deleteByProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/pc/planProductCenterFeature/deleteByProductCodes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/planProductCenterFeature/findByRegionCode */
export async function findByRegionCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode2Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductCenterFeatureDO[]>(
    '/api/pc/planProductCenterFeature/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductCenterFeature/getByProductCodeAndPid */
export async function getByProductCodeAndPid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByProductCodeAndPidParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductCenterFeatureDO>(
    '/api/pc/planProductCenterFeature/getByProductCodeAndPid',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductCenterFeature/getPidByProductCode */
export async function getPidByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPidByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/pc/planProductCenterFeature/getPidByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductCenterFeature/selectByProductCode */
export async function selectByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductCenterFeatureDO[]>(
    '/api/pc/planProductCenterFeature/selectByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
