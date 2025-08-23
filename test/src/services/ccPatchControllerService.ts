
import { stringify } from 'qs';
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/cc/patch/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function exists(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/patch/exists?${stringify(params)}`, {
    ...option,
  });
}

export async function itemsql(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/patch/itemsql?${stringify(params)}`, {
    ...option,
  });
}

export async function list(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/patch/list?${stringify(params)}`, {
    ...option,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/cc/patch/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/cc/patch/upload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  exists,
  itemsql,
  list,
  update,
  upload,
}
