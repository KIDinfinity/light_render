// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/registration/test/testDataFromRedis */
export async function testDataFromRedis(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>(
    '/api/registration/test/testDataFromRedis',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/registration/test/testMQ */
export async function testMq(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/registration/test/testMQ', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/registration/test/testXxJob */
export async function testXxJob(
  body: API.TestRequestVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOObject>('/api/registration/test/testXxJob', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
