// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryCfgPlanDictProduct */
export async function queryCfgPlanDictProduct(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListCfgPlanDictProductBO>(
    '/rpc/pc/plan/queryCfgPlanDictProduct',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryCfgPlanDictProductV2 */
export async function queryCfgPlanDictProductV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCfgPlanDictProductV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListCfgPlanDictProductBO>(
    '/rpc/pc/plan/queryCfgPlanDictProductV2',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryCfgPlanProductFeature */
export async function queryCfgPlanProductFeature(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListCfgPlanProductFeatureBO>(
    '/rpc/pc/plan/queryCfgPlanProductFeature',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/pc/plan/queryClaimDictProductConfig */
export async function queryClaimDictProductConfig(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListClaimDictProductDO>(
    '/rpc/pc/plan/queryClaimDictProductConfig',
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
