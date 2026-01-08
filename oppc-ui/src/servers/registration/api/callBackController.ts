// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/callBack/omneCallBack */
export async function omneCallBack(
  body: API.OmneCallBackRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/callBack/omneCallBack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
