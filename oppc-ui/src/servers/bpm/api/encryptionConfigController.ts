// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/encryptionConfig/getEncryptionConfigure */
export async function getEncryptionConfigure(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEncryptionConfigureParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOMapStringListString>(
    '/api/bpm/encryptionConfig/getEncryptionConfigure',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bpm/encryptionConfig/getEncryptMap */
export async function getEncryptMap(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/bpm/encryptionConfig/getEncryptMap', {
    method: 'POST',
    ...(options || {}),
  });
}
