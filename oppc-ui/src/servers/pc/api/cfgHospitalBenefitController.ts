// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/planHospitalBenefit/getByRegion */
export async function getByRegion1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByRegion1Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanHospitalBenefitDO[]>(
    '/api/pc/planHospitalBenefit/getByRegion',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/planHospitalBenefitUnit/findByRegionCode */
export async function findByRegionCode4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findByRegionCode4Params,
  options?: { [key: string]: any },
) {
  return request<API.CfgPlanHospitalBenefitUnitDO[]>(
    '/api/pc/planHospitalBenefitUnit/findByRegionCode',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
