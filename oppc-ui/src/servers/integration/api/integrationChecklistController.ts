// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/checklist/getIntegrationCallRecordDetail */
export async function getIntegrationCallRecordDetail(
  body: API.IntegrationCallRecordBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationCallRecordBO>(
    '/api/integration/checklist/getIntegrationCallRecordDetail',
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

/** 此处后端没有提供注释 POST /api/integration/checklist/getIntegrationCallRecords */
export async function getIntegrationCheckList(
  body: API.IntegrationChecklistInquiryParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIntegrationCallRecordBO>(
    '/api/integration/checklist/getIntegrationCallRecords',
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

/** 此处后端没有提供注释 POST /rpc/integration/checklist/getIntegrationCallRecordDetail */
export async function getIntegrationCallRecordDetail1(
  body: API.IntegrationCallRecordBO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOIntegrationCallRecordBO>(
    '/rpc/integration/checklist/getIntegrationCallRecordDetail',
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

/** 此处后端没有提供注释 POST /rpc/integration/checklist/getIntegrationCallRecords */
export async function getIntegrationCheckList1(
  body: API.IntegrationChecklistInquiryParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListIntegrationCallRecordBO>(
    '/rpc/integration/checklist/getIntegrationCallRecords',
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
