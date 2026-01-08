// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/stats/publish */
export async function publish(
  body: API.ReasonGroup,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/evy/stats/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
