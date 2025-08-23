
import request from '@/utils/request';

export async function cachedUid(params?: any, option?: any): Promise<any> {
  return request('/api/idGenerator/cachedUid', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function defaultUid(params?: any, option?: any): Promise<any> {
  return request('/api/idGenerator/defaultUid', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cachedUid,
  defaultUid,
}
