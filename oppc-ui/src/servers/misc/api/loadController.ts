// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/misc/load/processors */
export async function loadProcessorsToMongoDb(
  options?: {
    [key: string]: any;
  },
) {
  return request<Record>('/api/misc/load/processors', {
    method: 'POST',
    ...(options || {}),
  });
}
