// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/pend/reminder/job/executePendReminderJob */
export async function executePendReminderJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.executePendReminderJobParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/bpm/pend/reminder/job/executePendReminderJob',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
