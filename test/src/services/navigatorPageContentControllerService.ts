
import request from '@/utils/request';

export async function completeDocumentDispatch(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/pageContent/completeDocumentDispatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function query(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/pageContent/query', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDocumentDispatch(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/pageContent/queryDocumentDispatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/pageContent/remove', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/pageContent/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeDocumentDispatch,
  query,
  queryDocumentDispatch,
  remove,
  save,
}
