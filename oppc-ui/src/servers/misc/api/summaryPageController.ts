// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getBusinessData */
export async function getBusinessData(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageResultVO>(
    '/api/navigator/summaryPage/getBusinessData',
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

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getC360Data */
export async function getC360Data(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageResultVO>(
    '/api/navigator/summaryPage/getC360Data',
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

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getEnvoyData */
export async function getEnvoyData(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageResultVO>(
    '/api/navigator/summaryPage/getEnvoyData',
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

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getInformationData */
export async function getInformationData(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageResultVO>(
    '/api/navigator/summaryPage/getInformationData',
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

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getSectionData */
export async function getSummaryPageSectionData(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageVO>(
    '/api/navigator/summaryPage/getSectionData',
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

/** 此处后端没有提供注释 POST /api/navigator/summaryPage/getSummaryCoverage */
export async function getSummaryCoverage(
  body: API.SummaryPageQueryVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOSummaryPageResultVO>(
    '/api/navigator/summaryPage/getSummaryCoverage',
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
