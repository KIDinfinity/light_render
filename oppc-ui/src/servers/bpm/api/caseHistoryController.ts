// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/history/cleanByBusinessNo */
export async function cleanByBusinessNo(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/history/cleanByBusinessNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/history/deleteCaseHistory */
export async function deleteCaseHistory(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/history/deleteCaseHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/history/getBusinessTransactionProcess */
export async function getBusinessTransactionProcess(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBusinessTransactionProcess>(
    '/api/bpm/history/getBusinessTransactionProcess',
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

/** 此处后端没有提供注释 POST /api/bpm/history/initBusinessTransactionProcessRecordForNbProcess */
export async function initBusinessTransactionProcessRecordForNbProcess(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVO>(
    '/api/bpm/history/initBusinessTransactionProcessRecordForNbProcess',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/history/isBusinessNeedQc */
export async function isBusinessNeedQc(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/history/isBusinessNeedQc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/history/queryAssessorByClaimNoList */
export async function queryAssessorByClaimNoList(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.TaskAssigneeInfoVO[]>(
    '/api/bpm/history/queryAssessorByClaimNoList',
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

/** 此处后端没有提供注释 POST /api/bpm/history/updateBusinessTransactionProcess */
export async function updateBusinessTransactionProcess(
  body: API.BusinessTransactionProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/history/updateBusinessTransactionProcess',
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
