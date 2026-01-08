// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/opus/memoryCache/clearCacheList */
export async function clearCacheList1(
  body: API.CacheableOperationVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/memoryCache/clearCacheList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/disableAllCacheName */
export async function disableAllCacheName1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>(
    '/api/opus/memoryCache/disableAllCacheName',
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

/** 此处后端没有提供注释 POST /api/opus/memoryCache/disableCacheName */
export async function disableCacheName1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/memoryCache/disableCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/enableAllCacheName */
export async function enableAllCacheName1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/memoryCache/enableAllCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/enableCacheName */
export async function enableCacheName1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/memoryCache/enableCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/getAllMemoryCache */
export async function getAllMemoryCache1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/opus/memoryCache/getAllMemoryCache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/getCacheNames */
export async function getCacheNames1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/opus/memoryCache/getCacheNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/getDisableCacheNames */
export async function getDisableCacheNames1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/opus/memoryCache/getDisableCacheNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/queryCache */
export async function queryCache1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/opus/memoryCache/queryCache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/queryCacheValue */
export async function queryCacheValue1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/opus/memoryCache/queryCacheValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/opus/memoryCache/removeKey */
export async function removeKey1(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/opus/memoryCache/removeKey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/clearCacheList */
export async function clearCacheList(
  body: API.CacheableOperationVO[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/clearCacheList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/disableAllCacheName */
export async function disableAllCacheName(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/disableAllCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/disableCacheName */
export async function disableCacheName(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/disableCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/enableAllCacheName */
export async function enableAllCacheName(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/enableAllCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/enableCacheName */
export async function enableCacheName(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/enableCacheName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/getAllMemoryCache */
export async function getAllMemoryCache(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/memoryCache/getAllMemoryCache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/getCacheNames */
export async function getCacheNames(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/memoryCache/getCacheNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/getDisableCacheNames */
export async function getDisableCacheNames(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/memoryCache/getDisableCacheNames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/queryCache */
export async function queryCache(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/memoryCache/queryCache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/queryCacheValue */
export async function queryCacheValue(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/uc/memoryCache/queryCacheValue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/uc/memoryCache/removeKey */
export async function removeKey(
  body: API.CacheableOperationVO,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOVoid>('/api/uc/memoryCache/removeKey', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
