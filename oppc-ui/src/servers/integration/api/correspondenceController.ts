// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/correspondence/sendAsync */
export async function sendAsync(
  body: API.CorrespondenceVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/correspondence/sendAsync',
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

/** 此处后端没有提供注释 POST /api/integration/correspondence/sendImmediately */
export async function sendImmediately(
  body: API.CorrespondenceVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>(
    '/api/integration/correspondence/sendImmediately',
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

/** 此处后端没有提供注释 GET /api/integration/correspondence/triggerCorrespondenceTask */
export async function triggerCorrespondenceTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.triggerCorrespondenceTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/integration/correspondence/triggerCorrespondenceTask',
    {
      method: 'GET',
      params: {
        // createDate has a default value: 20200101
        createDate: '20200101',
        ...params,
      },
      ...(options || {}),
    },
  );
}
