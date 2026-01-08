// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/getIntegrationExecInfo */
export async function getIntegrationExecInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIntegrationExecInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListRuleCommonRpcFactInfoVO>(
    '/rpc/integration/getIntegrationExecInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
