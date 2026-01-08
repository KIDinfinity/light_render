// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/bpm/jp/region/checkRegionIsJapan */
export async function checkCanRevert(options?: { [key: string]: any }) {
  return request<API.ResultVOBoolean>('/api/bpm/jp/region/checkRegionIsJapan', {
    method: 'GET',
    ...(options || {}),
  });
}
