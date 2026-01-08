// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/evy/activateReasonGroup */
export async function activateReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/navigator/evy/activateReasonGroup',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/batchActivateReasonGroup */
export async function batchActivateReasonGroup(
  body: API.ReasonGroupVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/navigator/evy/batchActivateReasonGroup',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/doRetryNbSendCcm */
export async function doRetryNbSendCcm(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doRetryNbSendCcmParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/navigator/evy/doRetryNbSendCcm',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/evy/findReasonInfo */
export async function findReasonInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOEnvoyInfo>('/api/navigator/evy/findReasonInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/evy/findReasonInfoByInquiryBusinessNo */
export async function findReasonInfoByInquiryBusinessNo(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOEnvoyInfo>(
    '/api/navigator/evy/findReasonInfoByInquiryBusinessNo',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/resolveReasonGroup */
export async function resolveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/navigator/evy/resolveReasonGroup',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/sendReminder */
export async function sendReminder(
  body: API.ReasonReminderVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>('/api/navigator/evy/sendReminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/evy/updatePendingMemoStatus */
export async function updatePendingMemoStatus(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/navigator/evy/updatePendingMemoStatus',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/updatePendingMemoSubmitStatus */
export async function updatePendingMemoSubmitStatus(
  body: API.UpdateMemoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/navigator/evy/updatePendingMemoSubmitStatus',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/waiveReasonGroup */
export async function waiveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/navigator/evy/waiveReasonGroup',
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

/** 此处后端没有提供注释 POST /api/navigator/evy/waiveReasonGroupByCaseNo */
export async function waiveReasonGroupByCaseNo(
  body: API.CancelEnvoyEvent,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/evy/waiveReasonGroupByCaseNo',
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
