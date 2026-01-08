// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/config/upload */
export async function configUpload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.configUploadParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.ResponseVOVoid>('/api/registration/config/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
