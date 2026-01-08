// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/bpm/jp/auditLog/getTriggerPoint */
export async function getTriggerPoint(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTriggerPointParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/jp/auditLog/getTriggerPoint', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
