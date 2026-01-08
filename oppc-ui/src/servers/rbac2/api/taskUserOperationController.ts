// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/task/operation/approve */
export async function approve(
  body: API.TaskOperationRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOTaskUserOperationVO>(
    '/api/rbac2/task/operation/approve',
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
