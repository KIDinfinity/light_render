// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /rpc/bpm/pos/bizProcess/findBusinessDataByCaseNo */
export async function findBusinessDataByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findBusinessDataByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.BusinessData>(
    '/rpc/bpm/pos/bizProcess/findBusinessDataByCaseNo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /rpc/bpm/pos/bizProcess/triggerPaymentTrackProcess */
export async function triggerPaymentTrackProcess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerPaymentTrackProcessParams,
  options?: { [key: string]: any },
) {
  return request<boolean>(
    '/rpc/bpm/pos/bizProcess/triggerPaymentTrackProcess',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /rpc/bpm/pos/task/completeTask */
export async function completePosTask(
  body: API.TaskRequestParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/pos/task/completeTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
