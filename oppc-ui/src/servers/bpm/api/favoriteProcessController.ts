// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/favoriteProcess/findFavorite */
export async function findFavoriteProcess(
  body: API.FavoriteProcessInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOFavoriteProcessInfo>(
    '/api/bpm/favoriteProcess/findFavorite',
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

/** 此处后端没有提供注释 POST /api/bpm/favoriteProcess/insert */
export async function insert2(
  body: API.FavoriteProcessInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOFavoriteProcessInfo>(
    '/api/bpm/favoriteProcess/insert',
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

/** 此处后端没有提供注释 POST /api/bpm/favoriteProcess/update */
export async function update2(
  body: API.FavoriteProcessInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOInteger>('/api/bpm/favoriteProcess/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
