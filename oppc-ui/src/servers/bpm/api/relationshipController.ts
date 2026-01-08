// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/findProcessRelationship */
export async function getCaseRelationshipDetail(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageCaseRelationship>(
    '/api/bpm/findProcessRelationship',
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
