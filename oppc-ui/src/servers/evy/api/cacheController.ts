// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/cache/cleanAll */
export async function cleanAll(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/evy/cache/cleanAll', {
    method: 'POST',
    ...(options || {}),
  });
}
