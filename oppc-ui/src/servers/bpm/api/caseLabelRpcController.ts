// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/caseLabel/bpm/findCaseLabelByBusinessNoList */
export async function findCaseLabelByBusinessNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIndicator>(
    '/rpc/bpm/caseLabel/bpm/findCaseLabelByBusinessNoList',
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

/** 此处后端没有提供注释 POST /rpc/bpm/caseLabel/bpm/findIndicatorByBusinessNoList */
export async function findIndicatorByBusinessNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIndicator>(
    '/rpc/bpm/caseLabel/bpm/findIndicatorByBusinessNoList',
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

/** 此处后端没有提供注释 POST /rpc/bpm/caseLabel/updateBpmCaseLabel */
export async function updateBpmCaseLabel(
  body: API.BpmCaseLabelVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/caseLabel/updateBpmCaseLabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/caseLabel/updateBpmCaseLabelList */
export async function updateBpmCaseLabelList(
  body: API.BpmCaseLabelVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/rpc/bpm/caseLabel/updateBpmCaseLabelList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/caseLabel/upsertCaseLabel */
export async function upsertCaseLabel(
  body: API.BpmCaseLabel,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/rpc/bpm/caseLabel/upsertCaseLabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
