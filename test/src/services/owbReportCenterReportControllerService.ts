import { stringify } from 'qs';
import request from '@/utils/request';

export async function batchSumUpStatisticForStats(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/batchSumUpStatisticForStats', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAllSearchFieldValues(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/report/listAllSearchFieldValues?${stringify(params)}`, {
    ...option,
  });
}

export async function listSearchFieldValue(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/listSearchFieldValue', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function report(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/query/report', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findStorage(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/query/findStorage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function generate(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/query/generate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sumUpStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/sumUpStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sumUpStatisticByReportCode(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/sumUpStatisticByReportCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sumUpStatisticForStats(params?: any, option?: any): Promise<any> {
  return request('/api/rc/report/sumUpStatisticForStats', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchSumUpStatisticForStats,
  listAllSearchFieldValues,
  listSearchFieldValue,
  report,
  sumUpStatistic,
  sumUpStatisticByReportCode,
  sumUpStatisticForStats,
  generate,
  findStorage,
};
