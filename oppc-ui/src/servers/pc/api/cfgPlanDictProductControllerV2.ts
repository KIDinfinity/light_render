// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/plan/planDictProduct/findByRegionCodeAndProductCodeList */
export async function findByRegionCodeAndProductCodeList(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringCfgPlanDictProductDO>(
    '/api/pc/plan/planDictProduct/findByRegionCodeAndProductCodeList',
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
