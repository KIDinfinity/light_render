// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/update/updateBpmInfo */
export async function updateBpmInfo(
  body: API.UpdateDataVO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/update/updateBpmInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
