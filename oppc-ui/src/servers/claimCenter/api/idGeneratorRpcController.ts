// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/idGenerator/cachedUid */
export async function cachedUidGenerator(options?: { [key: string]: any }) {
  return request<API.ResultVOLong>('/rpc/idGenerator/cachedUid', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/idGenerator/defaultUid */
export async function defaultUidGenerator(options?: { [key: string]: any }) {
  return request<API.ResultVOLong>('/rpc/idGenerator/defaultUid', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/idGenerator/manualSetCurrentNo */
export async function manualSetCurrentNo(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/idGenerator/manualSetCurrentNo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/idGenerator/universal */
export async function universalGenerator(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<string>('/rpc/idGenerator/universal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/idGenerator/universal/batch */
export async function universalBatchGenerator(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<string[]>('/rpc/idGenerator/universal/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/idGenerator/universalWrapper */
export async function universalGeneratorWrapper(
  body: API.UniversalGeneratorVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/rpc/idGenerator/universalWrapper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
