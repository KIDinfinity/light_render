// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/reasons/activateReasonGroup */
export async function activateReasonGroup2(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/activateReasonGroup',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/autoSaveReasonGroup */
export async function autoSaveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/autoSaveReasonGroup',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/buildAndActivateReasonGroupByMemo */
export async function buildAndActivateReasonGroupByMemo(
  body: API.HkClaimPending[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListReasonGroupVO>(
    '/api/evy/reasons/buildAndActivateReasonGroupByMemo',
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

/** 此处后端没有提供注释 GET /api/evy/reasons/checkHasUnreadReasonGroup */
export async function existUnreadReasonGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.existUnreadReasonGroupParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/evy/reasons/checkHasUnreadReasonGroup',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/reasons/checkMedMemo */
export async function checkMedMemo2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkMedMemo2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/evy/reasons/checkMedMemo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/checkSentReasonByGroupAndCase */
export async function checkSentReasonByGroupAndCase(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkSentReasonByGroupAndCaseParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>(
    '/api/evy/reasons/checkSentReasonByGroupAndCase',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/reasons/deleteReasonGroup */
export async function deleteReasonGroup2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteReasonGroup2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/evy/reasons/deleteReasonGroup', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/draftReasonGroup */
export async function draftReasonGroup2(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/draftReasonGroup',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/findReasonInfo */
export async function findReasonInfo4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findReasonInfo4Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseReasonGroupDTO>(
    '/api/evy/reasons/findReasonInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/reasons/getReminderSendTime */
export async function getReminderSendDate(
  body: API.SendTimeQuery,
  options?: { [key: string]: any },
) {
  return request<API.ResultVODate>('/api/evy/reasons/getReminderSendTime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/listMemoConfigsByCodes */
export async function listMemoConfigsByCodes(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListPendingMemoConfigDO>(
    '/api/evy/reasons/listMemoConfigsByCodes',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/markReasonGroupRead */
export async function markReasonGroupRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.markReasonGroupReadParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/evy/reasons/markReasonGroupRead', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/patchCoreSeqNo */
export async function patchCoreSeqNo(
  body: API.DataPatchRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/evy/reasons/patchCoreSeqNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/resolveReasonGroup */
export async function resolveReasonGroup2(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/resolveReasonGroup',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/saveReasonGroup */
export async function saveReasonGroup(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/saveReasonGroup',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/sendReminder */
export async function sendReminder2(
  body: API.ReasonReminderVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>('/api/evy/reasons/sendReminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/switchReminder */
export async function switchReminder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.switchReminderParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/evy/reasons/switchReminder', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/evy/reasons/testReminderJob */
export async function testReminderJob(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ReturnTString>('/api/evy/reasons/testReminderJob', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/evy/reasons/updatePendingMemoStatus */
export async function updatePendingMemoStatus2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updatePendingMemoStatus2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/updatePendingMemoStatus',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/evy/reasons/waivePendingMemo */
export async function waivePendingMemo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waivePendingMemoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/waivePendingMemo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/evy/reasons/waiveReasonGroup */
export async function waiveReasonGroup2(
  body: API.ReasonGroupVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOReasonGroupVO>(
    '/api/evy/reasons/waiveReasonGroup',
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
