// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/correspondence/triggerIntegrationCcm */
export async function triggerIntegrationCcm(
  body: API.CcmTriggerVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/bpm/correspondence/triggerIntegrationCcm',
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

/** 此处后端没有提供注释 POST /rpc/bpm/correspondence/triggerIntegrationCcmV2 */
export async function triggerIntegrationCcmV2(
  body: API.CcmTriggerVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/bpm/correspondence/triggerIntegrationCcmV2',
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

/** 此处后端没有提供注释 POST /rpc/bpm/correspondence/triggerReimbursementCcm */
export async function triggerReimbursementCcm(
  body: API.CcmTriggerVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/rpc/bpm/correspondence/triggerReimbursementCcm',
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
