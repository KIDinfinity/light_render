// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/Sync/sendOds2RcsSync */
export async function sendOds2RcsAsync(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/api/integration/Sync/sendOds2RcsSync', {
    method: 'POST',
    ...(options || {}),
  });
}
