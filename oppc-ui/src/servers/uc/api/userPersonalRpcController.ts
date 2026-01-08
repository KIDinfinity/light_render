// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/userPersonalInfo/findByUserId */
export async function findUserPersonalInfoByUserId(
  body: API.UserPersonalInfoDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOUserPersonalInfoDO>(
    '/rpc/uc/userPersonalInfo/findByUserId',
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
