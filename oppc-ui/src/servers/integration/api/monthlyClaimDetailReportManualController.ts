// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/report/generateReport */
export async function generateReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateReportParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/report/generateReport', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/report/queryReport */
export async function queryReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryReportParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/integration/report/queryReport', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
