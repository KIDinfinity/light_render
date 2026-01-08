// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/logInOutNotify/sendNotification */
export async function sendNotification(
  body: API.UserLogInOutNotifictionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/uc/logInOutNotify/sendNotification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/logInOutNotify/sendNotificationV2 */
export async function sendNotificationV2(
  body: API.UserLogInOutNotifyVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/rpc/uc/logInOutNotify/sendNotificationV2',
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
