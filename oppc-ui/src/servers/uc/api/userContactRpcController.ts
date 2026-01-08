// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/uc/contacts/findUserContactsNotInAccountStatus */
export async function findUserContactsNotInAccountStatus(
  body: number[],
  options?: { [key: string]: any },
) {
  return request<API.UserContacts[]>(
    '/rpc/uc/contacts/findUserContactsNotInAccountStatus',
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

/** 此处后端没有提供注释 POST /rpc/uc/contacts/get */
export async function getUserContacts(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.UserContacts[]>('/rpc/uc/contacts/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/uc/contacts/getAll */
export async function getAll(options?: { [key: string]: any }) {
  return request<API.UserContacts[]>('/rpc/uc/contacts/getAll', {
    method: 'POST',
    ...(options || {}),
  });
}
