// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/info/getAllIntegrationCode */
export async function getAllIntegrationCode(options?: { [key: string]: any }) {
  return request<API.ResultVOListIntegrationInfoDO>(
    '/api/integration/info/getAllIntegrationCode',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
