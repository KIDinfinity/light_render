// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/dataMasking/log */
export async function getDataMaskingLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDataMaskingLogParams,
  options?: { [key: string]: any },
) {
  return request<API.DataMaskingLog>('/api/navigator/dataMasking/log', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dataMasking/record */
export async function record(
  body: API.DataMaskingLog[],
  options?: { [key: string]: any },
) {
  return request<any>('/api/navigator/dataMasking/record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
