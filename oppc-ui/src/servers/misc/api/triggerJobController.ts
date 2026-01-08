// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/navigator/claim/process/triggerApprovedCaseDailyEndJob */
export async function triggerApprovedCaseDailyEndJob(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.TriggerJobResultVO>(
    '/api/navigator/claim/process/triggerApprovedCaseDailyEndJob',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
