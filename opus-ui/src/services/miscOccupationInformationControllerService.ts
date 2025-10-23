
import request from '@/utils/request';

export async function getName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/occupation/getName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function occupation(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/occupation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/occupation/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getName,
  occupation,
  searchName,
}
