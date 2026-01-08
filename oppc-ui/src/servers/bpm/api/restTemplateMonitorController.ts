// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/opus/frame/caller/restTemplate/getPoolRoutes */
export async function getPoolRoutes(options?: { [key: string]: any }) {
  return request<API.HttpRoute[]>(
    '/api/opus/frame/caller/restTemplate/getPoolRoutes',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/opus/frame/caller/restTemplate/getPoolStatsByRoutes */
export async function getPoolStatsByRoutes(options?: { [key: string]: any }) {
  return request<Record>(
    '/api/opus/frame/caller/restTemplate/getPoolStatsByRoutes',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/opus/frame/caller/restTemplate/getTotalPoolStats */
export async function getTotalPoolStats(options?: { [key: string]: any }) {
  return request<API.PoolStats>(
    '/api/opus/frame/caller/restTemplate/getTotalPoolStats',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}
