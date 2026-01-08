// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/homepageCfg/findHomepageConfigByOrgAndCategory */
export async function findHomepageConfigByOrgAndCategory(
  body: API.CfgOrganizationHomepageDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgOrganizationHomepageDO>(
    '/api/uc/homepageCfg/findHomepageConfigByOrgAndCategory',
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

/** 此处后端没有提供注释 POST /api/uc/homepageCfg/findHomepageUiVersion */
export async function findHomepageUiVersion(
  body: API.CfgOrganizationHomepageDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCfgOrganizationHomepageDO>(
    '/api/uc/homepageCfg/findHomepageUiVersion',
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
