// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/bpm/claim/process/checkCanRevert */
export async function checkCanRevert1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkCanRevert1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>('/api/bpm/claim/process/checkCanRevert', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/claim/process/endCaseByCaseNo */
export async function endCaseByCaseNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.endCaseByCaseNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/bpm/claim/process/endCaseByCaseNo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/claim/process/revert */
export async function revert(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.revertParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/bpm/claim/process/revert', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/claim/process/triggerApprovedCaseDailyEndJob */
export async function triggerApprovedCaseDailyEndJob(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.EndCaseJobResultVO>(
    '/api/bpm/claim/process/triggerApprovedCaseDailyEndJob',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/claim/process/validateCaseRelation */
export async function validateCaseRelation(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/bpm/claim/process/validateCaseRelation',
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

/** 此处后端没有提供注释 POST /api/bpm/claim/process/validatePmaApprovalAssignee */
export async function validatePmaApprovalAssignee(
  body: API.CaseSubmitVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListExceptionMessage>(
    '/api/bpm/claim/process/validatePmaApprovalAssignee',
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
