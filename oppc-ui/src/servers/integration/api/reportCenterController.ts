// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/reportcenter/getReportList */
export async function getReportList(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageReportStyleVO>(
    '/api/integration/reportcenter/getReportList',
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

/** 此处后端没有提供注释 POST /api/integration/reportcenter/print */
export async function print(body: API.Page, options?: { [key: string]: any }) {
  return request<any>('/api/integration/reportcenter/print', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/reportcenter/search */
export async function searchReportQuery(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageOnlineReportVOObject>(
    '/api/integration/reportcenter/search',
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
