// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/submission/getSubmissionConfig */
export async function getSubmissionConfig(
  body: API.SubmissionConfigQO,
  options?: { [key: string]: any },
) {
  return request<API.InterfaceIdentifyBO>(
    '/rpc/bpm/submission/getSubmissionConfig',
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
