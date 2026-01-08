// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/uc/test/testDataFromRedis */
export async function testDataFromRedis(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/uc/test/testDataFromRedis', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/test/testMQ */
export async function testMq(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/uc/test/testMQ', {
    method: 'POST',
    ...(options || {}),
  });
}
