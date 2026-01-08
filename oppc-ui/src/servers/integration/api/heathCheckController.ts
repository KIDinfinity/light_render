// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/integration/healthCheck/all */
export async function healthCheckAll(options?: { [key: string]: any }) {
  return request<API.ResultVO>('/api/integration/healthCheck/all', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/integration/healthCheck/findAllHealthCheck */
export async function findAllHealthCheck(options?: { [key: string]: any }) {
  return request<API.ResultVOListHealthCheckResponseVO>(
    '/api/integration/healthCheck/findAllHealthCheck',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/integration/healthCheck/findHealthCheckOne */
export async function findHealthCheckOne(
  body: API.HealthCheckRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOHealthCheckResponseVO>(
    '/api/integration/healthCheck/findHealthCheckOne',
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

/** 此处后端没有提供注释 POST /api/integration/healthCheck/one */
export async function healthCheckOne(
  body: API.HealthCheckRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOHealthCheckResponseVO>(
    '/api/integration/healthCheck/one',
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
