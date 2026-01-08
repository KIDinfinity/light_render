// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/countByProductCodeAndPremiumType */
export async function countByProductCodeAndPremiumType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countByProductCodeAndPremiumTypeParams,
  options?: { [key: string]: any },
) {
  return request<number>(
    '/api/pc/planProductFeature/countByProductCodeAndPremiumType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/findByRegion */
export async function findByRegion1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegion1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/findByRegion',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/findByRegionCodeAndProductCode */
export async function findByRegionCodeAndProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/findByRegionCodeAndProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/findByRegionCodeAndProductCodes */
export async function findByRegionCodeAndProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/findByRegionCodeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/getByRegion */
export async function getByRegion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByRegionParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/getByRegion',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/getProductFeatures */
export async function getProductFeatures(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductFeaturesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/getProductFeatures',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/getRiderFeature */
export async function getRiderFeature(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRiderFeatureParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/getRiderFeature',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planProductFeature/getSupportedProductFeatures */
export async function getSupportedProductFeatures(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSupportedProductFeaturesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanProductFeatureDO[]>(
    '/api/pc/planProductFeature/getSupportedProductFeatures',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
