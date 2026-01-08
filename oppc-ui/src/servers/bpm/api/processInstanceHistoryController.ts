// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/processInstanceHistory/getProcessInstanceHistory */
export async function getProcessInstanceHistoryByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessInstanceHistoryByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInstanceHistory>(
    '/api/bpm/processInstanceHistory/getProcessInstanceHistory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/processInstanceHistory/getProcessInstanceHistoryByBusinessNo */
export async function getProcessInstanceHistoryByBusinessNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProcessInstanceHistoryByBusinessNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInstanceHistory>(
    '/api/bpm/processInstanceHistory/getProcessInstanceHistoryByBusinessNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
