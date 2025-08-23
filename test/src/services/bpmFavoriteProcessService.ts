
import request from '@/utils/request';

export async function findFavorite(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favoriteProcess/findFavorite', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favoriteProcess/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/favoriteProcess/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findFavorite,
  insert,
  update,
}
