// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/support/refreshSession */
export async function refreshSession(options?: { [key: string]: any }) {
  return request<API.ResultVOVoid>('/api/uc/support/refreshSession', {
    method: 'POST',
    ...(options || {}),
  });
}
