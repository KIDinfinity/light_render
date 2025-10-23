
import request from '@/utils/request';

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionaryType/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllType(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionaryType/findAllType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findTypeByPage(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionaryType/findTypeByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  find,
  findAllType,
  findTypeByPage,
}
