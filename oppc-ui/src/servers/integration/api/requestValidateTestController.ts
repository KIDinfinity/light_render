// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/test/callTest */
export async function asyncExternalRequest(
  body: API.JSONObject,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/test/callTest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/test/validateTest */
export async function validateTest(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/integration/test/validateTest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
