// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/notice/getDeliveryRequirementReminderNotice */
export async function getDeliveryRequirementReminderNotice(
  body: API.EnvoyRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/evy/notice/getDeliveryRequirementReminderNotice',
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
