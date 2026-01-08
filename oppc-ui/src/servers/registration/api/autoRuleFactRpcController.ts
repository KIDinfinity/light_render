// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/registration/findByCaseNoList */
export async function findByCaseNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBatchDocScanningMainDO>(
    '/rpc/registration/findByCaseNoList',
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
