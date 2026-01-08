// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/refreshData */
export async function refreshData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.refreshDataParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/navigator/cases/refreshData', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
