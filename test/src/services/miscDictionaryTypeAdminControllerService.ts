
import request from '@/utils/request';

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/delete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteBatch(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/deleteBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllType(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/findAllType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTypeByPage(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/findTypeByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/management/misc/dictionaryType/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  remove,
  deleteBatch,
  find,
  findAllType,
  findTypeByPage,
  insert,
  update,
}
