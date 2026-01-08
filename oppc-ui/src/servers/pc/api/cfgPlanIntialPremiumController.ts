// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planIntialPremium/findByRegionCode */
export async function findByRegionCode3(
  body: API.CfgPlanInitialPremiumDO,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanInitialPremiumDO>(
    '/api/pc/planIntialPremium/findByRegionCode',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
