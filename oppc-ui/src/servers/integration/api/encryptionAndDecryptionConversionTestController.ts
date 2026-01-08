// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/encoder/decryption */
export async function decryption(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.decryptionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/encoder/decryption', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/encoder/encryption */
export async function encryption(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.encryptionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/encoder/encryption', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/encoder/jweDecrypt */
export async function jweDecrypt(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.jweDecryptParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/encoder/jweDecrypt', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/integration/encoder/jweEncrypt */
export async function jweEncrypt(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.jweEncryptParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/encoder/jweEncrypt', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
