// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/special/batchHandleCaseV2 */
export async function batchHandleCaseV2(
  body: API.CaseSubmitVOObject[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/special/batchHandleCaseV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/special/handleCaseV2 */
export async function handleCaseV2(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/navigator/special/handleCaseV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
