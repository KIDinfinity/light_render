// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planDiscount/findByProductCodeAndDiscountType */
export async function findByProductCodeAndDiscountType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByProductCodeAndDiscountTypeParams,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDiscountDO[]>(
    '/api/pc/planDiscount/findByProductCodeAndDiscountType',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDiscount/findByRegionCode */
export async function findByRegionCode7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode7Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanDiscountDO[]>(
    '/api/pc/planDiscount/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planDiscount/findCampaignCode */
export async function findCampaignCode(
  body: API.CfgPlanDiscountDO,
  options?: { [key: string]: any },
) {
  return request<string>('/api/pc/planDiscount/findCampaignCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
