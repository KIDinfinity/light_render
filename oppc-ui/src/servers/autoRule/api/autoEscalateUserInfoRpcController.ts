// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/autoRule/autoEscalateUserInfo/getAutoEscalateUserList */
export async function getReAssignUserInfoList(
  body: API.AutoRuleVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserGroupDO>(
    '/rpc/autoRule/autoEscalateUserInfo/getAutoEscalateUserList',
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
