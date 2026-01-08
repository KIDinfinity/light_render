// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/360/getDispatchAddressByPolicyNo */
export async function getDispatchAddressByPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDispatchAddressByPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPhLifeAsiaResponseVO>(
    '/rpc/integration/360/getDispatchAddressByPolicyNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/360/getPayInStatusByPolicyNo */
export async function getPayInStatusByPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPayInStatusByPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPhLifeAsiaResponseVO>(
    '/rpc/integration/360/getPayInStatusByPolicyNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/integration/360/getPolicyInfoFromLAByPolicyNo */
export async function getPolicyInfoFromLaByPolicyNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPolicyInfoFromLAByPolicyNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPhLifeAsiaResponseVO>(
    '/rpc/integration/360/getPolicyInfoFromLAByPolicyNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
