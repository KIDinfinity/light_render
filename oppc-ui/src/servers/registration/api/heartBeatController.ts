// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/heartBeat */
export async function heartBeat(options?: { [key: string]: any }) {
  return request<API.ResultVOListObject>('/api/registration/heartBeat', {
    method: 'POST',
    ...(options || {}),
  });
}
