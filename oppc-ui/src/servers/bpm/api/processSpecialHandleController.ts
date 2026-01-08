// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/process/special/complete */
export async function completeProcess2(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseTaskVO>('/api/bpm/process/special/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
