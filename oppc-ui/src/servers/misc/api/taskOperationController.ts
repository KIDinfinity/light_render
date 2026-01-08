// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/task/getNotices */
export async function getNotices(
  body: API.TaskDataVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>('/api/navigator/task/getNotices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/task/getTask */
export async function create2(
  body: API.TaskQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskDataVO>('/api/navigator/task/getTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
