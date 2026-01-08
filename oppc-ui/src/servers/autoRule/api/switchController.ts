// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/autoRule/switch/getEnableTenantList */
export async function getEnableTenantList(options?: { [key: string]: any }) {
  return request<API.ResultVOListString>(
    '/api/autoRule/switch/getEnableTenantList',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
