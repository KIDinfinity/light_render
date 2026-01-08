// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /rpc/owb/health/check/db */
export async function checkDb(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/rpc/owb/health/check/db', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/owb/health/check/mongo */
export async function checkMongoDb(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/rpc/owb/health/check/mongo', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/owb/health/check/mq */
export async function checkMq(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/rpc/owb/health/check/mq', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/owb/health/check/redis */
export async function checkRedis(options?: { [key: string]: any }) {
  return request<API.ResultVOString>('/rpc/owb/health/check/redis', {
    method: 'POST',
    ...(options || {}),
  });
}
