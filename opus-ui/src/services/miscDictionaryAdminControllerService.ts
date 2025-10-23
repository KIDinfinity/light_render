
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionary/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteBatch,
  find,
  insert,
  page,
  update,
}
