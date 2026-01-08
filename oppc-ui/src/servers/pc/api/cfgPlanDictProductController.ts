// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/findByRegionCode */
export async function findByRegionCode8(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode8Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDictProductDO[]>(
    '/api/pc/planDictProduct/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getByRegionAndProductCode */
export async function getByRegionAndProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByRegionAndProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDictProductDO[]>(
    '/api/pc/planDictProduct/getByRegionAndProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getByRegionAndProductCodes */
export async function getByRegionAndProductCodes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByRegionAndProductCodesParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDictProductDO[]>(
    '/api/pc/planDictProduct/getByRegionAndProductCodes',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getProductCategoryByProductCode */
export async function getProductCategoryByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductCategoryByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/pc/planDictProduct/getProductCategoryByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getProductCodeByProductType */
export async function getProductCodeByProductType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductCodeByProductTypeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/pc/planDictProduct/getProductCodeByProductType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getProductCodeBySubProductType */
export async function getProductCodeBySubProductType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductCodeBySubProductTypeParams,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/pc/planDictProduct/getProductCodeBySubProductType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getProductTypeByProductCode */
export async function getProductTypeByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductTypeByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/pc/planDictProduct/getProductTypeByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDictProduct/getSubProductTypeByProductCode */
export async function getSubProductTypeByProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSubProductTypeByProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/pc/planDictProduct/getSubProductTypeByProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
