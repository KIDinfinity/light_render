// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/request/control/asyncExternalRequest */
export async function asyncExternalRequest1(
  body: API.AsyncExternalRequestParamsVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/request/control/asyncExternalRequest',
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

/** 此处后端没有提供注释 POST /api/integration/request/control/asyncExternalRequests */
export async function asyncExternalRequests(
  body: API.AsyncExternalRequestParamsVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/request/control/asyncExternalRequests',
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

/** 此处后端没有提供注释 POST /api/integration/request/control/mockSaveRequestControlJob */
export async function mockSaveRequestControlJob(
  body: API.MockRequestControlVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>(
    '/api/integration/request/control/mockSaveRequestControlJob',
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
