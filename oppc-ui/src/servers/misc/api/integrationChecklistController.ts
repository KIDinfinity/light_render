// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/cases/getIntegrationChecklist */
export async function getIntegrationChecklist(
  body: API.IntegrationChecklistInquiryParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIntegrationChecklistBO>(
    '/api/navigator/cases/getIntegrationChecklist',
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
