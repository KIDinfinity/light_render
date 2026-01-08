// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userRelation/findUserListByOwner */
export async function findUserListByOwner(
  body: API.OrganizationDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSetUserGeneralInfoDO>(
    '/api/uc/userRelation/findUserListByOwner',
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
