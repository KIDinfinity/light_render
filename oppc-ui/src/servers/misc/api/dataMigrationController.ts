// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/dm/assignPosTask */
export async function assignPosTask(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/navigator/dm/assignPosTask', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dm/extractClaimData */
export async function extractClaimData(
  body: API.MigrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/dm/extractClaimData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dm/migrateAll */
export async function migrateAll1(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/navigator/dm/migrateAll', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dm/migrateInfoToC360 */
export async function migrateInfoToC360(
  body: API.MigrateInfoToC360VO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListListInformationVO>(
    '/api/navigator/dm/migrateInfoToC360',
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

/** 此处后端没有提供注释 POST /api/navigator/dm/migrateOne */
export async function migrate1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.migrate1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/dm/migrateOne', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dm/test/migrationTaskCompleteMessage */
export async function migrate(
  body: API.MigrationTaskCompletedMessage,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/navigator/dm/test/migrationTaskCompleteMessage',
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
