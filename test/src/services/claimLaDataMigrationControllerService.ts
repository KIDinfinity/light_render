
import { stringify } from 'qs';
import request from '@/utils/request';

export async function clearLog(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/clearLog?${stringify(params)}`, {
    ...option,
  });
}

export async function clearReport(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/clearReport?${stringify(params)}`, {
    ...option,
  });
}

export async function clearSummaryReport(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/clearSummaryReport?${stringify(params)}`, {
    ...option,
  });
}

export async function generateReport(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/generateReport?${stringify(params)}`, {
    ...option,
  });
}

export async function generateReportBatch(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/generateReportBatch?${stringify(params)}`, {
    ...option,
  });
}

export async function generateReportByClaimNo(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/generateReportByClaimNo?${stringify(params)}`, {
    ...option,
  });
}

export async function generateSummaryReport(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/generateSummaryReport?${stringify(params)}`, {
    ...option,
  });
}

export async function generateSummaryReportByClaimNo(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/generateSummaryReportByClaimNo?${stringify(params)}`, {
    ...option,
  });
}

export async function startRCSDataMigration(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/startRCSDataMigration?${stringify(params)}`, {
    ...option,
  });
}

export async function startRCSDataMigrationByClaimNo(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/startRCSDataMigrationByClaimNo?${stringify(params)}`, {
    ...option,
  });
}

export async function startRCSDataMigrationNoThreadPool(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/startRCSDataMigrationNoThreadPool?${stringify(params)}`, {
    ...option,
  });
}

export async function startRCSDataMigrationWithBatchCache(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/startRCSDataMigrationWithBatchCache?${stringify(params)}`, {
    ...option,
  });
}

export async function startRcsDataMigrationMultiThread(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/startRcsDataMigrationMultiThread?${stringify(params)}`, {
    ...option,
  });
}

export async function testRCSDataMigration(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/la/dm/testRCSDataMigration?${stringify(params)}`, {
    ...option,
  });
}

export default {
  clearLog,
  clearReport,
  clearSummaryReport,
  generateReport,
  generateReportBatch,
  generateReportByClaimNo,
  generateSummaryReport,
  generateSummaryReportByClaimNo,
  startRCSDataMigration,
  startRCSDataMigrationByClaimNo,
  startRCSDataMigrationNoThreadPool,
  startRCSDataMigrationWithBatchCache,
  startRcsDataMigrationMultiThread,
  testRCSDataMigration,
}
