// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/load/processors */
export async function loadProcessorsToMongoDb(
  options?: {
    [key: string]: any;
  },
) {
  return request<Record>('/api/registration/load/processors', {
    method: 'POST',
    ...(options || {}),
  });
}
