// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/dataBatch/trigger */
export async function triggerDataBatch(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/bpm/dataBatch/trigger', {
    method: 'POST',
    ...(options || {}),
  });
}
