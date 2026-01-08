// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/contacts/contactsQuery */
export async function contactsQuery(options?: { [key: string]: any }) {
  return request<API.ResultVOListUserContacts>(
    '/api/uc/contacts/contactsQuery',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/uc/contacts/contactsQueryByUserId */
export async function contactsQueryByUserId(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserContacts>(
    '/api/uc/contacts/contactsQueryByUserId',
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

/** 此处后端没有提供注释 POST /api/uc/contacts/get */
export async function getUserContacts1(options?: { [key: string]: any }) {
  return request<API.ResultVOListUserContacts>('/api/uc/contacts/get', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/contacts/getByName */
export async function getUserContactsByUserName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserContactsByUserNameParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUserContacts>('/api/uc/contacts/getByName', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
