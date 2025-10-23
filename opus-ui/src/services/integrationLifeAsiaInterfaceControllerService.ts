
import { stringify } from 'qs';
import request from '@/utils/request';

export async function calculateHospitalBill(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/calculateHospitalBill', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function generateLaDailyReportByBatchNo(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/la/generateLaDailyReportByBatchNo?${stringify(params)}`, {
    ...option,
  });
}

export async function generateLaDailyReportByDateMaxBatchNo(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/la/generateLaDailyReportByDateMaxBatchNo?${stringify(params)}`, {
    ...option,
  });
}

export async function generateLaDailyReportWholeDay(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/la/generateLaDailyReportWholeDay?${stringify(params)}`, {
    ...option,
  });
}

export async function getPolicyInsuredData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/getPolicyInsuredData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mappingData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/mappingData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockLaErrorResponse(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/mockLaErrorResponse', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockLaResponse(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/mockLaResponse', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockOperationLog(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/mockOperationLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function recordBusinessObject(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/recordBusinessObject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function removeBusinessObject(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/removeBusinessObject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startDailyBatchJob(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/startDailyBatchJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startDailyBatchJobByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/integration/la/startDailyBatchJobByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateLaBusinessDate(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/la/updateLaBusinessDate?${stringify(params)}`, {
    ...option,
  });
}

export async function uploadLaDailyReport(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/la/uploadLaDailyReport?${stringify(params)}`, {
    ...option,
  });
}

export default {
  calculateHospitalBill,
  generateLaDailyReportByBatchNo,
  generateLaDailyReportByDateMaxBatchNo,
  generateLaDailyReportWholeDay,
  getPolicyInsuredData,
  mappingData,
  mockLaErrorResponse,
  mockLaResponse,
  mockOperationLog,
  recordBusinessObject,
  removeBusinessObject,
  startDailyBatchJob,
  startDailyBatchJobByClaimNo,
  updateLaBusinessDate,
  uploadLaDailyReport,
}
