
import request from '@/utils/request';

export async function deleteData(params?: any, option?: any): Promise<any> {
  return request('/api/dc/snapshot/deleteData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryData(params?: any, option?: any): Promise<any> {
  return request('/api/dc/snapshot/queryData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveData(params?: any, option?: any): Promise<any> {
  return request('/api/dc/snapshot/saveData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteData,
  queryData,
  saveData,
}
