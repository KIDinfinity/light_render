// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/pos/dc/submit */
export async function dcSubmit(
  body: API.PosDataCaptureVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/navigator/pos/dc/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
