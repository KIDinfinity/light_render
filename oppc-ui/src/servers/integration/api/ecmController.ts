// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/ecm/gengerateEcmUrl */
export async function gengerateEcmUrl(
  body: API.EcmParamsVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOString>('/api/integration/ecm/gengerateEcmUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
