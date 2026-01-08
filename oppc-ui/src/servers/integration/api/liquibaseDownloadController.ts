// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/liquibase/generate */
export async function generate1(
  body: API.IntegrationContextV2,
  options?: { [key: string]: any },
) {
  return request<string>('/api/integration/liquibase/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/liquibase/generateV2 */
export async function generateV21(
  body: API.LiquibaseDownLoadQo,
  options?: { [key: string]: any },
) {
  return request<string>('/api/integration/liquibase/generateV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/liquibase/generate */
export async function generate(
  body: API.IntegrationContextV2,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/integration/liquibase/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/integration/liquibase/generateV2 */
export async function generateV2(
  body: API.LiquibaseDownLoadQo,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/integration/liquibase/generateV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
