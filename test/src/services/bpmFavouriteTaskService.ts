import request from '@/utils/request';

export async function createFavoriteTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favouriteTask/createFavoriteTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFavoriteTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favouriteTask/getFavoriteTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveFavoriteTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favouriteTask/saveFavoriteTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listFavoriteTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favouriteTask/listFavoriteTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  createFavoriteTask,
  getFavoriteTask,
  saveFavoriteTasks,
  listFavoriteTasks,
};
