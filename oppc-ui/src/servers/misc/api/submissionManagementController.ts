// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/submission/receiveData */
export async function receiveData(
  body: API.SubmissionDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/submission/receiveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
