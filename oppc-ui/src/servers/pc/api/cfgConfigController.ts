// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/getMiscConfig */
export async function getMiscConfig(
  body: API.RequestMiscParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListCfgMiscDictDO>(
    '/api/pc/getMiscConfig',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
