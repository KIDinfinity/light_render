// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/navigator/remote/service/record/findNeedRetryPostQC */
export async function findNeedRetryPostQc(
  body: API.PageRemoteServiceCallRecordDO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageRemoteServiceCallRecordDO>(
    '/api/navigator/remote/service/record/findNeedRetryPostQC',
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

/** 此处后端没有提供注释 POST /api/navigator/remote/service/record/retryTriggerPostQC */
export async function retryTriggerPostQc(
  body: API.RemoteServiceCallRecordDO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/remote/service/record/retryTriggerPostQC',
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

/** 此处后端没有提供注释 POST /api/navigator/remote/service/record/specialCreatePostQc */
export async function specialCreatePostQc(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/navigator/remote/service/record/specialCreatePostQc',
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

/** 此处后端没有提供注释 POST /api/navigator/remote/service/record/test */
export async function test(
  body: API.TestObj,
  options?: { [key: string]: any },
) {
  return request<Record>('/api/navigator/remote/service/record/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
