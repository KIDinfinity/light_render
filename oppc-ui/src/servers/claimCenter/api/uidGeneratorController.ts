// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/idGenerator/cachedUid */
export async function cachedUidGenerator1(options?: { [key: string]: any }) {
  return request<API.ResultVOLong>('/api/idGenerator/cachedUid', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/idGenerator/defaultUid */
export async function defaultUidGenerator1(options?: { [key: string]: any }) {
  return request<API.ResultVOLong>('/api/idGenerator/defaultUid', {
    method: 'POST',
    ...(options || {}),
  });
}
