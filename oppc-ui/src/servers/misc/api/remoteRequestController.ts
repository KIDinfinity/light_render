// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/remote/request/resolveRemoteApprove */
export async function resolveRemoteApprove(
  body: API.RemoteRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/navigator/remote/request/resolveRemoteApprove',
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
