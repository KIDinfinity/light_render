// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/task/listUDRelationTasks */
export async function listUdRelationTasks(
  body: API.UDQueryTaskVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListUDRelationTaskVO>(
    '/api/bpm/task/listUDRelationTasks',
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
