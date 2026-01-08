// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/dashboard/query */
export async function getDashBoardData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDashBoardDataParams,
  options?: { [key: string]: any },
) {
  return request<API.BpmDashboardBO[]>('/rpc/bpm/dashboard/query', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/dashboard/queryOperatorAndCostTime */
export async function queryOperatorAndCostTime(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryOperatorAndCostTimeParams,
  options?: { [key: string]: any },
) {
  return request<API.BpmDashboardActivityBO[]>(
    '/rpc/bpm/dashboard/queryOperatorAndCostTime',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
