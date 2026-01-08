// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/v2/business/process/getBusinessProcessByCaseNoListAndDay */
export async function getBusinessProcessByCaseNoListAndDay(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.BusinessProcess[]>(
    '/api/bpm/v2/business/process/getBusinessProcessByCaseNoListAndDay',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/business/process/splitCase */
export async function splitCase2(
  body: API.ProcessParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/v2/business/process/splitCase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/v2/business/process/updateBusinessNoAndCleanSubmissionDate */
export async function updateBusinessNoAndCleanSubmissionDate(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/v2/business/process/updateBusinessNoAndCleanSubmissionDate',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/business/process/updateBusinessProcess */
export async function updateBusinessProcess(
  body: API.TaskCompletionVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/v2/business/process/updateBusinessProcess',
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

/** 此处后端没有提供注释 POST /api/bpm/v2/business/process/updateOperationDate */
export async function updateOperationDate(
  body: API.BusinessProcess,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/v2/business/process/updateOperationDate',
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
