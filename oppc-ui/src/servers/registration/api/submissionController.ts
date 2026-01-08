// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/submission/batchCreateCaseSubmit */
export async function batchCreateCaseSubmit(
  body: API.BatchCreateCaseRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBatchCreateCaseResponseVO>(
    '/api/registration/submission/batchCreateCaseSubmit',
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

/** 此处后端没有提供注释 POST /api/registration/submission/docScanning/create */
export async function getAllCaseCategoryCompanyMap1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllCaseCategoryCompanyMap1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOCaseCreateResultVO>(
    '/api/registration/submission/docScanning/create',
    {
      method: 'POST',
      params: {
        ...params,
        caseCreationVO: undefined,
        ...params['caseCreationVO'],
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/submission/findDocRelCustomerInf */
export async function findDocRelCustomerInf(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListNbClinetInfo>(
    '/api/registration/submission/findDocRelCustomerInf',
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

/** 此处后端没有提供注释 POST /api/registration/submission/getCaseCategoryCompanyMap */
export async function getAllCaseCategoryCompanyMap(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListSubmissionIdentifyDO>(
    '/api/registration/submission/getCaseCategoryCompanyMap',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/submission/getCaseRelevantSubmissionBatchInfo */
export async function getCaseRelevantSubmissionBatchInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaseRelevantSubmissionBatchInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSubmissionBatchInfoVO>(
    '/api/registration/submission/getCaseRelevantSubmissionBatchInfo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/submission/queryBusinessData */
export async function queryBusinessData(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/registration/submission/queryBusinessData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/submission/saveBusinessData */
export async function saveBusinessData(
  body: Record,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/registration/submission/saveBusinessData',
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
