// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/dbr/start/startSchedule */
export async function startSchedule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startScheduleParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/dbr/start/startSchedule', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/dbr/stop/stopSchedule */
export async function stopSchedule(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/dbr/stop/stopSchedule', {
    method: 'POST',
    ...(options || {}),
  });
}
