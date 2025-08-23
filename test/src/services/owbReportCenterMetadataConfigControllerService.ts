import { stringify } from 'qs';
import request from '@/utils/request';

export async function addAndQueryStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/addAndQueryStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addDashboard(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/addDashboard', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addReport(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/addReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function addStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/addStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/deleteStatistic', {
    ...option,
    method: 'DELETE',
    body: params,
  });
}

export async function findStatisticByReportCode(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/findStatisticByReportCode?${stringify(params)}`, {
    ...option,
  });
}

export async function generateDashboardCode(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/generateDashboardCode?${stringify(params)}`, {
    ...option,
  });
}

export async function generateDataSetCode(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/generateDataSetCode?${stringify(params)}`, {
    ...option,
  });
}

export async function generateReportCode(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/generateReportCode?${stringify(params)}`, {
    ...option,
  });
}

export async function generateStatisticCode(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/generateStatisticCode?${stringify(params)}`, {
    ...option,
  });
}

export async function listDashboards(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/listDashboards?${stringify(params)}`, {
    ...option,
  });
}

export async function listReports(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/listReports?${stringify(params)}`, {
    ...option,
  });
}
export async function listReportsV2(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/listReportsV2?${stringify(params)}`, {
    ...option,
  });
}

export async function findReportMetadata(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/query/findReportMetadata?${stringify(params)}`, {
    ...option,
  });
}

export async function updateAndQueryStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/updateAndQueryStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateStatistic(params?: any, option?: any): Promise<any> {
  return request('/api/rc/metadata/updateStatistic', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDashboardsV2(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/metadata/listDashboardsV2?${stringify(params)}`, {
    ...option,
  });
}

export default {
  addAndQueryStatistic,
  addDashboard,
  addReport,
  addStatistic,
  deleteStatistic,
  findStatisticByReportCode,
  generateDashboardCode,
  generateDataSetCode,
  generateReportCode,
  generateStatisticCode,
  listDashboards,
  listReports,
  listReportsV2,
  findReportMetadata,
  updateAndQueryStatistic,
  updateStatistic,
  listDashboardsV2,
};
