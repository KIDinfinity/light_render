// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/caseOperationInfo/findActionUserInfoList */
export async function findActionUserInfoList(
  body: API.CaseOperationInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOActionUserInfo>(
    '/api/bpm/caseOperationInfo/findActionUserInfoList',
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
