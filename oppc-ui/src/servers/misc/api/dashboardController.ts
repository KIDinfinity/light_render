// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/dashboard/approvalPieChart */
export async function approvalPieChart(options?: { [key: string]: any }) {
  return request<API.ResultVOPieChartVO>(
    '/api/navigator/dashboard/approvalPieChart',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/assessmentPieChart */
export async function assessmentPieChart(options?: { [key: string]: any }) {
  return request<API.ResultVOPieChartVO>(
    '/api/navigator/dashboard/assessmentPieChart',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/brokenLine */
export async function queryBrokenLineData(options?: { [key: string]: any }) {
  return request<API.ResultVOChartVO>('/api/navigator/dashboard/brokenLine', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/histogram */
export async function queryHistogramData(options?: { [key: string]: any }) {
  return request<API.ResultVOChartVO>('/api/navigator/dashboard/histogram', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/taskAverageAndSla2 */
export async function taskAverageAndSla(options?: { [key: string]: any }) {
  return request<API.ResultVOChartVO>(
    '/api/navigator/dashboard/taskAverageAndSla2',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/taskAverageTimeByPerson */
export async function taskAverageTimeByPerson(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOChartVO>(
    '/api/navigator/dashboard/taskAverageTimeByPerson',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/navigator/dashboard/variousClaimTypeNumberOverSeason */
export async function variousClaimTypeNumberOverSeason(
  options?: {
    [key: string]: any;
  },
) {
  return request<API.ResultVOChartVO>(
    '/api/navigator/dashboard/variousClaimTypeNumberOverSeason',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
