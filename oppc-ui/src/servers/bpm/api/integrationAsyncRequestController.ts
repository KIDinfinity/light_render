// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/integration/sendQueenCaseEnd */
export async function sendQueenCaseEnd(
  body: API.CaseEndMassage,
  options?: { [key: string]: any },
) {
  return request<string>('/api/bpm/integration/sendQueenCaseEnd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
