// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/moduleConfig/findByRegion */
export async function findByRegion(options?: { [key: string]: any }) {
  return request<API.ResultVOListModuleConfigVO>(
    '/api/navigator/cases/moduleConfig/findByRegion',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
