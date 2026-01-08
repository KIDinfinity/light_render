// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/wakeUp/wakeUpAssign */
export async function wakeUpAssign(
  body: API.WakeUpAssignVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/wakeUp/wakeUpAssign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
