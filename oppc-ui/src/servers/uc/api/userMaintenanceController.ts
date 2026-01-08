// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/userMaintenance/actions */
export async function actions(
  body: API.UserMaintenanceVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/uc/userMaintenance/actions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
