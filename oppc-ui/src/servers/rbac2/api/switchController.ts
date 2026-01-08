// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/switch/getEnableTenantList */
export async function getEnableTenantList(options?: { [key: string]: any }) {
  return request<API.ResultVOListString>(
    '/api/rbac2/switch/getEnableTenantList',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
