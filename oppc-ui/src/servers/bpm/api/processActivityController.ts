// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/process/activity/findActivitiesByCaseCategory */
export async function findActivitiesByCaseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findActivitiesByCaseCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivity>(
    '/api/bpm/process/activity/findActivitiesByCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/activity/findAutoActivitiesByCaseCategory */
export async function findAutoActivitiesByCaseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAutoActivitiesByCaseCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivity>(
    '/api/bpm/process/activity/findAutoActivitiesByCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/activity/listActivityByCaseCategory */
export async function listActivityByCaseCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listActivityByCaseCategoryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivity>(
    '/api/bpm/process/activity/listActivityByCaseCategory',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/activity/listActivityByCaseCategory/v2 */
export async function listActivityByCaseCategory1(
  body: API.CaseCategoryList,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListProcessActivity>(
    '/api/bpm/process/activity/listActivityByCaseCategory/v2',
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

/** 此处后端没有提供注释 POST /api/bpm/process/activity/listProcessAct */
export async function listProcessAct1(options?: { [key: string]: any }) {
  return request<API.ResultVOMapStringListProcessActivity>(
    '/api/bpm/process/activity/listProcessAct',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/process/activity/listProcessActByProcDefIds */
export async function listProcessActByProcDefIds(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListProcessActivity>(
    '/api/bpm/process/activity/listProcessActByProcDefIds',
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
