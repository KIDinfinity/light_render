// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/idGenerator/manualSetCurrentNo */
export async function manualSetCurrentNo1(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/idGenerator/manualSetCurrentNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/idGenerator/universal */
export async function universalGenerator1(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/idGenerator/universal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/idGenerator/universal/batch */
export async function universalBatchGenerator1(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOListString>('/api/idGenerator/universal/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
