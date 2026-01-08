// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/evy/reasons/ph/checkClaimAckEmail */
export async function checkClaimAckEmail(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/evy/reasons/ph/checkClaimAckEmail',
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

/** 此处后端没有提供注释 POST /api/evy/reasons/ph/migration */
export async function migration(
  body: API.MigrationEnvoyData,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMigrationEnvoyData>(
    '/api/evy/reasons/ph/migration',
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
