// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/personal/findByUserId */
export async function findUserPersonalInfoByUserId1(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.UserPersonalInfoDO>('/rpc/uc/personal/findByUserId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/personal/findUserMailAddresses */
export async function findUserMailAddresses(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.UserPersonalInfoDO[]>(
    '/rpc/uc/personal/findUserMailAddresses',
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
