// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/regionTolerance/findByRegionAndCurrency */
export async function findByRegionAndCurrency(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionAndCurrencyParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgRegionToleranceDO[]>(
    '/api/pc/regionTolerance/findByRegionAndCurrency',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/regionTolerance/findByRegionCode */
export async function findByRegionCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgRegionToleranceDO>(
    '/api/pc/regionTolerance/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
