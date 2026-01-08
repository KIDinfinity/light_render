// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/test/downloadLog */
export async function downloadLog(
  body: API.LogDownloadRequest,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/test/downloadLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/test/getByMap */
export async function getPlanProductDictByRegionAndProductCode1(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDictProductDO[]>('/api/pc/test/getByMap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/test/getPlanProductDictByRegionAndProductCode */
export async function getPlanProductDictByRegionAndProductCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPlanProductDictByRegionAndProductCodeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDictProductDO[]>(
    '/api/pc/test/getPlanProductDictByRegionAndProductCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/test/swaggerTest */
export async function test(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/pc/test/swaggerTest', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/test/testCache */
export async function testCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testCacheParams,
  options?: { [key: string]: any },
) {
  return request<API.PlanBenefitTypeDO[]>('/api/pc/test/testCache', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/test/v2/quotation */
export async function testQuotation(
  body: API.QuotationRequestBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOQuotationResponseVO>('/api/pc/test/v2/quotation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
