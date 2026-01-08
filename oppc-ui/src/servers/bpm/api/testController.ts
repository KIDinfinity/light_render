// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/test/decrypt */
export async function decrypt(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.decryptParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/bpm/test/decrypt', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/test/encrypt */
export async function encrypt(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.encryptParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/bpm/test/encrypt', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/test/getAesEncoder */
export async function getAesEncoder(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/bpm/test/getAesEncoder', {
    method: 'POST',
    ...(options || {}),
  });
}
