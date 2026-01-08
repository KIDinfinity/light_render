// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/pendCategory/hasPendingForFactConfirmation */
export async function hasPendingForFactConfirmation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hasPendingForFactConfirmationParams,
  options?: { [key: string]: any },
) {
  return request<boolean>(
    '/rpc/bpm/pendCategory/hasPendingForFactConfirmation',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
