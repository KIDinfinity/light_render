// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/supportPatch/migrateJpOpusNonSupportCase */
export async function complete3(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/bpm/supportPatch/migrateJpOpusNonSupportCase',
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
