// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/th/reimburseInProgressSMS/triggerByCase */
export async function triggerByCase(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/th/reimburseInProgressSMS/triggerByCase',
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

/** 此处后端没有提供注释 POST /api/navigator/th/reimburseInProgressSMS/triggerJob */
export async function triggerJob(
  body: API.JobContext,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/th/reimburseInProgressSMS/triggerJob',
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
