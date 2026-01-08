// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/correspondence/changeNewCorrespondenceSwitch */
export async function changeNewCorrespondenceSwitch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeNewCorrespondenceSwitchParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/navigator/correspondence/changeNewCorrespondenceSwitch',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/correspondence/execute */
export async function sendPendingMessage(
  body: API.CreatePendingCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringObject>(
    '/api/navigator/correspondence/execute',
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

/** 此处后端没有提供注释 POST /api/navigator/correspondence/getReasonReminderAttachmentCodes */
export async function getReasonReminderAttachmentCodes(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<string[]>(
    '/api/navigator/correspondence/getReasonReminderAttachmentCodes',
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
