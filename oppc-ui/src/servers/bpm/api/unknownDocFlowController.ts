// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/unknown/doc/create */
export async function createUnknownDoc(
  body: API.CreateUnknownDocCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOProcessInfoVO>('/api/bpm/unknown/doc/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bpm/unknown/doc/find */
export async function findUnknownDoc(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findUnknownDocParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/unknown/doc/find', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/unknown/doc/submit */
export async function submitUnknownDoc(
  body: API.SubmitUnknownDocCaseVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/unknown/doc/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
