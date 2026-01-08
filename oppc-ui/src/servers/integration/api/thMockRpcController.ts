// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/th/mock/mock/mockOds */
export async function recordBusinessObject(
  body: API.SubmissionInfo,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/th/mock/mock/mockOds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/th/mock/mock/mockOdsOnAssessment */
export async function mockOdsOnAssessment(
  body: API.SubmissionInfoList,
  options?: { [key: string]: any },
) {
  return request<Record>('/rpc/th/mock/mock/mockOdsOnAssessment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
