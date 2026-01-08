// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/v2/conversion/generateConversionConfig */
export async function generateConversionConfig(
  body: API.GeneratorRequest,
  options?: { [key: string]: any },
) {
  return request<string>(
    '/api/integration/v2/conversion/generateConversionConfig',
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

/** 此处后端没有提供注释 POST /api/integration/v2/conversion/testRequest */
export async function testRequest1(
  body: API.IntegrationRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.IntegrationRequestVO>(
    '/api/integration/v2/conversion/testRequest',
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

/** 此处后端没有提供注释 POST /api/integration/v2/conversion/testResponse */
export async function testResponse(
  body: API.IntegrationResponseVO,
  options?: { [key: string]: any },
) {
  return request<API.IntegrationResponseVO>(
    '/api/integration/v2/conversion/testResponse',
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
