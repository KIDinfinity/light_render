// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/la/calculateHospitalBill */
export async function calculateHospitalBill(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.calculateHospitalBillParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/calculateHospitalBill',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/checkBoIsRunning */
export async function checkBoIsRunning(options?: { [key: string]: any }) {
  return request<boolean>('/api/integration/la/checkBoIsRunning', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/la/generateLaDailyReportByBatchNo */
export async function generateLaDailyReportByBatchNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateLaDailyReportByBatchNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/la/generateLaDailyReportByBatchNo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/integration/la/generateLaDailyReportByDateMaxBatchNo */
export async function generateLaDailyReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateLaDailyReportParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/la/generateLaDailyReportByDateMaxBatchNo',
    {
      method: 'GET',
      params: {
        // date has a default value: yyyyMMdd
        date: 'yyyyMMdd',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/integration/la/generateLaDailyReportWholeDay */
export async function generateLaDailyReportWholeDay(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.generateLaDailyReportWholeDayParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/la/generateLaDailyReportWholeDay',
    {
      method: 'GET',
      params: {
        // date has a default value: yyyyMMdd
        date: 'yyyyMMdd',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/getPolicyInsuredData */
export async function getPolicyInsured1(
  body: API.RemotePolicyInsuredQO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/la/getPolicyInsuredData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/la/mappingData */
export async function mappingData(options?: { [key: string]: any }) {
  return request<API.ResultVOListDenyCodeReasonCodeMappingDO>(
    '/api/integration/la/mappingData',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/mockLaErrorResponse */
export async function mockLaErrorResponse(options?: { [key: string]: any }) {
  return request<API.LaResponseResult>(
    '/api/integration/la/mockLaErrorResponse',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/mockLaResponse */
export async function mockLaResponse(options?: { [key: string]: any }) {
  return request<API.LaResponseResult>('/api/integration/la/mockLaResponse', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/la/mockOperationLog */
export async function mockOperationLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.mockOperationLogParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/la/mockOperationLog', {
    method: 'POST',
    params: {
      ...params,
      o: undefined,
      ...params['o'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/la/oppositeLifeAsiaSingletonLock */
export async function releaseBoLock(options?: { [key: string]: any }) {
  return request<API.ResultVOString>(
    '/api/integration/la/oppositeLifeAsiaSingletonLock',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/recordBusinessObject */
export async function recordBusinessObject2(
  body: API.RecordBusinessObjectVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/recordBusinessObject',
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

/** 此处后端没有提供注释 POST /api/integration/la/removeBusinessObject */
export async function removeBusinessObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeBusinessObjectParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/removeBusinessObject',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/removeSplitCaseBusinessObject */
export async function removeSplitCaseBusinessObject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeSplitCaseBusinessObjectParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/removeSplitCaseBusinessObject',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/startDailyBatchJob */
export async function startDailyBatchJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startDailyBatchJobParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/startDailyBatchJob',
    {
      method: 'POST',
      params: {
        // checkCode has a default value: schedule
        checkCode: 'schedule',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/startDailyBatchJobByBatchNo */
export async function startDailyBatchJob1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startDailyBatchJob1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/startDailyBatchJobByBatchNo',
    {
      method: 'POST',
      params: {
        // checkCode has a default value: schedule
        checkCode: 'schedule',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/startDailyBatchJobByClaimNo */
export async function startDailyBatchJobByClaimNo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startDailyBatchJobByClaimNoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/startDailyBatchJobByClaimNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/la/syncLaIncidentSeqMapping */
export async function syncLaIncidentSeqMapping(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOBoolean>(
    '/api/integration/la/syncLaIncidentSeqMapping',
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

/** 此处后端没有提供注释 GET /api/integration/la/updateLaBusinessDate */
export async function updateLaBusinessDate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateLaBusinessDateParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/integration/la/updateLaBusinessDate', {
    method: 'GET',
    params: {
      // date has a default value: yyyyMMdd
      date: 'yyyyMMdd',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/la/uploadLaDailyReport */
export async function uploadLaDailyReport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadLaDailyReportParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/integration/la/uploadLaDailyReport', {
    method: 'GET',
    params: {
      // date has a default value: yyyyMMdd
      date: 'yyyyMMdd',
      ...params,
    },
    ...(options || {}),
  });
}
