// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/bpm/favouriteTask/createFavoriteTask */
export async function createFavoriteTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createFavoriteTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/favouriteTask/createFavoriteTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/favouriteTask/getFavoriteTask */
export async function getFavoriteTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFavoriteTaskParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/favouriteTask/getFavoriteTask', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/bpm/favouriteTask/listFavoriteTask */
export async function listFavoriteTask(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageFavouriteTaskDetailVO>(
    '/api/bpm/favouriteTask/listFavoriteTask',
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

/** 此处后端没有提供注释 POST /api/bpm/favouriteTask/listFavoriteTasks */
export async function listFavoriteTasks(
  body: API.Page,
  options?: { [key: string]: any },
) {
  return request<API.ResultVOPageFavouriteActivityVo>(
    '/api/bpm/favouriteTask/listFavoriteTasks',
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

/** 此处后端没有提供注释 POST /api/bpm/favouriteTask/saveFavoriteTasks */
export async function saveFavoriteTasks(
  body: API.FavouriteTask[],
  options?: { [key: string]: any },
) {
  return request<API.ResultVO>('/api/bpm/favouriteTask/saveFavoriteTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
