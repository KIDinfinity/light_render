// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/job/jobRefresh */
export async function jobRefresh(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/job/jobRefresh', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/job/reTriggerSubProcessJob */
export async function reTriggerSubProcessJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reTriggerSubProcessJobParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/job/reTriggerSubProcessJob', {
    method: 'POST',
    params: {
      ...params,
      requestVO: undefined,
      ...params['requestVO'],
    },
    ...(options || {}),
  });
}
