
import request from '@/utils/request';

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/mc/converse/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function remove(params?: any, option?: any): Promise<any> {
  return request('/api/mc/converse/remove', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function removeNotification(params?: any, option?: any): Promise<any> {
  return request('/api/mc/converse/removeNotification', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  list,
  remove,
  removeNotification,
}
