// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/caseLabel/addCaseLabel */
export async function addCaseLabel(
  body: API.BpmCaseLabel,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/caseLabel/addCaseLabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/caseLabel/deleteCaseLabel */
export async function deleteCaseLabel(
  body: API.BpmCaseLabel,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/caseLabel/deleteCaseLabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/caseLabel/getApplicableLabelCodes */
export async function getApplicableLabelCodes(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListCfgCaseLabelVO>(
    '/api/bpm/caseLabel/getApplicableLabelCodes',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
