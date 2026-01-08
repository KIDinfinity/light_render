// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/integration/serviceDowntime/isMeetDowntime */
export async function isMeet(
  body: API.ActivityIntegrationCodeVO,
  options?: { [key: string]: any },
) {
  return request<boolean>('/rpc/integration/serviceDowntime/isMeetDowntime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/serviceDowntime/isMeetDowntimeV2 */
export async function isMeetV2(
  body: API.ActivityIntegrationCodeVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODownTimeResultVO>(
    '/rpc/integration/serviceDowntime/isMeetDowntimeV2',
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
