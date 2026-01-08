// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/conversion/getConversionData */
export async function getConversionData(options?: { [key: string]: any }) {
  return request<API.IntegrationExceptionHandlingDataDO[]>(
    '/rpc/integration/conversion/getConversionData',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
