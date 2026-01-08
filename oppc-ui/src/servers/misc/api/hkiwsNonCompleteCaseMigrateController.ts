// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/iws/nonCompleteCase/attachDoc */
export async function attachDoc(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/iws/nonCompleteCase/attachDoc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/iws/nonCompleteCase/migrateAll */
export async function migrateAll(
  body: API.IWSRequestMigrateVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/iws/nonCompleteCase/migrateAll',
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

/** 此处后端没有提供注释 POST /api/navigator/iws/nonCompleteCase/migrateByClaimCaseId */
export async function migrateByClaimCaseId(
  body: API.IWSRequestMigrateVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/iws/nonCompleteCase/migrateByClaimCaseId',
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

/** 此处后端没有提供注释 POST /api/navigator/iws/nonCompleteCase/migrateByReceivedDate */
export async function migrateByReceivedDate(
  body: API.IWSRequestMigrateVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/iws/nonCompleteCase/migrateByReceivedDate',
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

/** 此处后端没有提供注释 POST /api/navigator/iws/nonCompleteCase/updateCMIndex */
export async function updateCmIndex(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/iws/nonCompleteCase/updateCMIndex',
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
