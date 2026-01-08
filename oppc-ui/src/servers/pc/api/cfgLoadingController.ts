// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/loadingMappingWithNano/findByRegionCodeAndOperator */
export async function findNanoLoadingCodeByRegionCodeAndOperator(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findNanoLoadingCodeByRegionCodeAndOperatorParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgLoadingMappingWithNanoDO[]>(
    '/api/pc/loadingMappingWithNano/findByRegionCodeAndOperator',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/loadingMappingWithUwme/findByRegionCode */
export async function listByRegionCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listByRegionCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgLoadingMappingWithUwmeDO[]>(
    '/api/pc/loadingMappingWithUwme/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/findByRegionCode */
export async function findByRegionCode6(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode6Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanExtraPremiumLoadingRuleDO[]>(
    '/api/pc/planExtraPremiumLoadingRule/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/findByRegionCodeAndProductCode */
export async function findByRegionCodeAndProductCode2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCode2Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanExtraPremiumLoadingRuleDO>(
    '/api/pc/planExtraPremiumLoadingRule/findByRegionCodeAndProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planExtraPremiumLoadingRule/findByRegionCodeAndProductCodes */
export async function findByRegionCodeAndProductCodes2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeAndProductCodes2Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanExtraPremiumLoadingRuleDO[]>(
    '/api/pc/planExtraPremiumLoadingRule/findByRegionCodeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planLoadingReason/findByFunctionTypeAndProductCodes */
export async function findByFunctionTypeAndProductCodes1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByFunctionTypeAndProductCodes1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanLoadingReasonDO[]>(
    '/api/pc/planLoadingReason/findByFunctionTypeAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planLoadingReason/findByRegionAndFuncType */
export async function findByRegionAndFuncType1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionAndFuncType1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanLoadingReasonDO[]>(
    '/api/pc/planLoadingReason/findByRegionAndFuncType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
