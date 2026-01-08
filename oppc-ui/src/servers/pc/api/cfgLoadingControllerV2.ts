// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/v2/findByRegionCode */
export async function findByRegionCode5(options?: { [key: string]: any }) {
  return request<API.ResultVOMapStringCfgPlanExtraPremiumLoadingRuleDO>(
    '/api/pc/planExtraPremiumLoadingRule/v2/findByRegionCode',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/v2/findByRegionCodeAndProductCode */
export async function findByRegionCodeAndProductCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCfgPlanExtraPremiumLoadingRuleDO>(
    '/api/pc/planExtraPremiumLoadingRule/v2/findByRegionCodeAndProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/v2/findByRegionCodeAndProductCodes */
export async function findByRegionCodeAndProductCodes1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCodes1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanExtraPremiumLoadingRuleDO>(
    '/api/pc/planExtraPremiumLoadingRule/v2/findByRegionCodeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planLoadingReason/v2/findByFunctionTypeAndProductCodes */
export async function findByFunctionTypeAndProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByFunctionTypeAndProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanLoadingReasonDO>(
    '/api/pc/planLoadingReason/v2/findByFunctionTypeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planLoadingReason/v2/findByRegionAndFuncType */
export async function findByRegionAndFuncType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionAndFuncTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListCfgPlanLoadingReasonDO>(
    '/api/pc/planLoadingReason/v2/findByRegionAndFuncType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
