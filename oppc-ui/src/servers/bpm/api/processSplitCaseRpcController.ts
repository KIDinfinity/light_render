// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/process/splitCase/createSplitCase */
export async function createSplitCase(
  body: API.SplitCaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseSubmitVO>(
    '/rpc/bpm/process/splitCase/createSplitCase',
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
