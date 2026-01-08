// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/process/task/checkSnapshot */
export async function checkSnapshot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkSnapshotParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/process/task/checkSnapshot', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/process/task/getCurrentTaskIdByBusinessNo */
export async function getCurrentTaskIdByBusinessNo1(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/process/task/getCurrentTaskIdByBusinessNo',
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
