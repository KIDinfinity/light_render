// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryCfgPlanPackage */
export async function queryCfgPlanPackage(options?: { [key: string]: any }) {
  return request<API.ResultVOListCfgPlanPackageBO>(
    '/rpc/pc/plan/queryCfgPlanPackage',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryCfgPlanPackageV2 */
export async function queryCfgPlanPackageV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCfgPlanPackageV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanPackageBO>(
    '/rpc/pc/plan/queryCfgPlanPackageV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
