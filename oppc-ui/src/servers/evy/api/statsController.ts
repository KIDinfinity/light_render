// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/stats/event/initData */
export async function initEventData(
  body: API.StatsInitDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/evy/stats/event/initData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
