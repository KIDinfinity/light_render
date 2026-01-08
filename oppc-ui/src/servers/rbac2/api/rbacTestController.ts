// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/rbac2/test/testDataFromRedis */
export async function testDataFromRedis(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/rbac2/test/testDataFromRedis', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/rbac2/test/testMQ */
export async function testMq(options?: { [key: string]: any }) {
  return request<API.ResultVOObject>('/api/rbac2/test/testMQ', {
    method: 'POST',
    ...(options || {}),
  });
}
