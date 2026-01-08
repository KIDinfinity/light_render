// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/cleanSubmissionDataLog */
export async function cleanSubmissionDataLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cleanSubmissionDataLogParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/registration/cleanSubmissionDataLog',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/testfindRelativeNbInfo */
export async function testfindRelativeNbInfo(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNbClinetInfo>(
    '/api/registration/testfindRelativeNbInfo',
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

/** 此处后端没有提供注释 POST /api/registration/testRuleCommonRpcBatch */
export async function testRuleCommonRpcBatch(
  body: API.RuleCommonRpcBatchArgVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVORuleCommonRpcBatchArgVO>(
    '/api/registration/testRuleCommonRpcBatch',
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

/** 此处后端没有提供注释 POST /api/registration/validate */
export async function validate(
  body: API.BatchDocScanningDataBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/registration/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
