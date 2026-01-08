// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/bpm/demaon/getWorkLoopStatus */
export async function getWorkLoopStatus(options?: { [key: string]: any }) {
  return request<API.ResultVOBoolean>('/api/bpm/demaon/getWorkLoopStatus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/demaon/manualTriggerWorkLoop */
export async function manualTriggerWorkLoop(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/demaon/manualTriggerWorkLoop', {
    method: 'GET',
    ...(options || {}),
  });
}
