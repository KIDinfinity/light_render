// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/refresh/config */
export async function refreshConfig(options?: { [key: string]: any }) {
  return request<API.ResponseVOVoid>('/api/pc/refresh/config', {
    method: 'POST',
    ...(options || {}),
  });
}
