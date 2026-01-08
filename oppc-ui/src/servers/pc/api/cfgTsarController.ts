// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planTsarCalculation/findByProductCode */
export async function findByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanTsarCalculationDO[]>(
    '/api/pc/planTsarCalculation/findByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planTsarCalculation/findByRegion */
export async function findByRegion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanTsarCalculationDO[]>(
    '/api/pc/planTsarCalculation/findByRegion',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planTsarCalculation/findCalculationList */
export async function findCalculationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findCalculationListParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanTsarCalculationDO[]>(
    '/api/pc/planTsarCalculation/findCalculationList',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planTsarCalculation/selectByProductCodes */
export async function selectByProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectByProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanTsarCalculationDO[]>(
    '/api/pc/planTsarCalculation/selectByProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planTsarType/findByRegionCode */
export async function findByRegionCode1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanTsarTypeDO[]>(
    '/api/pc/planTsarType/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
