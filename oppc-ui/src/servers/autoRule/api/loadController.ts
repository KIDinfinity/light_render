// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/autoRule/load/processors */
export async function loadProcessorsToMongoDb(
  options?: {
    [key: string]: any;
  },
) {
  return request<Record>('/api/autoRule/load/processors', {
    method: 'POST',
    ...(options || {}),
  });
}
