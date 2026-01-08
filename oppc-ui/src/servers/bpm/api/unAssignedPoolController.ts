// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/unassignedPool/refreshAllPool */
export async function complete2(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/unassignedPool/refreshAllPool', {
    method: 'POST',
    ...(options || {}),
  });
}
