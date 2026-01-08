// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/listAutoExpandConfig */
export async function listDisplayConfig1(options?: { [key: string]: any }) {
  return request<API.ResultVOListCfgToolBarAutoExpandDO>(
    '/api/bpm/listAutoExpandConfig',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
