// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/pc/mq/test/queryMqResult */
export async function queryMqResult(
  body: API.MqTestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListObject>('/api/pc/mq/test/queryMqResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/pc/mq/test/sendMq */
export async function sendMq(
  body: API.MqTestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/pc/mq/test/sendMq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
