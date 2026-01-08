// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/triggerDownTimeCase */
export async function triggerDownTimeCaseByManual(
  body: API.triggerDownTimeCaseByManualDTO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/navigator/cases/triggerDownTimeCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
