// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/completeProcess */
export async function completeProcess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.completeProcessParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/completeProcess', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/postQC */
export async function postQc(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/postQC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/releasePolicyPack */
export async function releasePolicyPack(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/releasePolicyPack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/sendWelcomeLetter */
export async function sendWelcomeLetter(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/sendWelcomeLetter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/updateNtu */
export async function updateNtu(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<API.SpecialHandlingBpmResultVO>(
    '/rpc/bpm/specialHandling/updateNtu',
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

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/updateSystemRemark */
export async function updateSystemRemark(
  body: API.SpecialHandlingParam,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/updateSystemRemark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/bpm/specialHandling/waiveEnvoy */
export async function waiveEnvoy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waiveEnvoyParams,
  options?: { [key: string]: any },
) {
  return request<any>('/rpc/bpm/specialHandling/waiveEnvoy', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
