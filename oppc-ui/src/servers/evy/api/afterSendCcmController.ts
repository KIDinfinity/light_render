// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/afterSendCCM/generateExternalUrl */
export async function generateExternalUrl(
  body: API.CorrespondenceInitialBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/evy/afterSendCCM/generateExternalUrl',
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

/** 此处后端没有提供注释 POST /api/evy/afterSendCCM/updateRecordStatus */
export async function updateRecordStatusBySendResult(
  body: API.CorrespondenceInitialBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/evy/afterSendCCM/updateRecordStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
