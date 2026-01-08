// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/plan/miscCommonHierArchy/findByProductCodeList */
export async function findByProductCodeList(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringMapStringCfgPlanMiscCommonHierarchyLinkDO>(
    '/api/pc/plan/miscCommonHierArchy/findByProductCodeList',
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

/** 此处后端没有提供注释 GET /api/pc/plan/miscCommonHierarchy/listAllByRegion */
export async function listAllByRegion(options?: { [key: string]: any }) {
  return request<API.ResultVOListCfgPlanMiscCommonHierarchyLinkDO>(
    '/api/pc/plan/miscCommonHierarchy/listAllByRegion',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/pc/plan/miscCommonHierarchy/listByProductAndOccupation */
export async function listByProductAndOccupation(
  body: API.InquiryParamVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanMiscCommonHierarchyLinkDO>(
    '/api/pc/plan/miscCommonHierarchy/listByProductAndOccupation',
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
