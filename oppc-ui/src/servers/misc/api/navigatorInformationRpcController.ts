// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/navigator/information/findInfoListByCondition */
export async function findInformationByCondition(
  body: API.NavigatorInformationDO,
  options?: { [key: string]: any },
) {
  return request<API.NavigatorInformationDO[]>(
    '/rpc/navigator/information/findInfoListByCondition',
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

/** 此处后端没有提供注释 POST /rpc/navigator/information/save */
export async function saveInformation(
  body: API.NavigatorInformationDO[],
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/navigator/information/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
