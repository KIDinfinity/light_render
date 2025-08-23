
import request from '@/utils/request';

export async function approvalPieChart(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/approvalPieChart', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function assessmentPieChart(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/assessmentPieChart', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function brokenLine(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/brokenLine', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function histogram(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/histogram', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function taskAverageAndSla2(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/taskAverageAndSla2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function taskAverageTimeByPerson(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/taskAverageTimeByPerson', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function variousClaimTypeNumberOverSeason(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/dashboard/variousClaimTypeNumberOverSeason', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  approvalPieChart,
  assessmentPieChart,
  brokenLine,
  histogram,
  taskAverageAndSla2,
  taskAverageTimeByPerson,
  variousClaimTypeNumberOverSeason,
}
