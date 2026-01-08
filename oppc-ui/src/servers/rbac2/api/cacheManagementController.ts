// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/cache/cleanAll */
export async function cleanAll(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/rbac2/cache/cleanAll', {
    method: 'POST',
    ...(options || {}),
  });
}
