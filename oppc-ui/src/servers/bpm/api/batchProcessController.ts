// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/assignBatchProcess */
export async function assignBatchProcess(
  body: API.BatchAssignee,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/batchProcess/assignBatchProcess',
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

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/bundleToBatchProcess */
export async function bundleToBatchProcess(
  body: API.BatchProcessInstance[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/batchProcess/bundleToBatchProcess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/deleteBatchProcessByNo */
export async function deleteBatchProcessByProcessId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBatchProcessByProcessIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/batchProcess/deleteBatchProcessByNo',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/deleteBatchProcessListByNo */
export async function deleteBatchProcessListByNo(
  body: API.BatchProcessInstance[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/bpm/batchProcess/deleteBatchProcessListByNo',
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

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/getSingleBatchProcess */
export async function getSignleBatchProcessByBatchNo(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListBatchProcessInstance>(
    '/api/bpm/batchProcess/getSingleBatchProcess',
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

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/listAllBatchProcess */
export async function getAllBatchProcessByBatchNo(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOListBatchProcessInstance>(
    '/api/bpm/batchProcess/listAllBatchProcess',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/batchProcess/scanSyncAllBatchProcess */
export async function scanSyncAllBatchProcess(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVO>(
    '/api/bpm/batchProcess/scanSyncAllBatchProcess',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
