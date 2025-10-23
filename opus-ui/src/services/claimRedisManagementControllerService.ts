
import request from '@/utils/request';

export async function deleteByKey(params?: any, option?: any): Promise<any> {
  return request('/api/claim/redisManagement/deleteByKey', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function expireByKey(params?: any, option?: any): Promise<any> {
  return request('/api/claim/redisManagement/expireByKey', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteByKey,
  expireByKey,
}
