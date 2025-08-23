
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/doc/imageSystem/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegion(params?: any, option?: any): Promise<any> {
  return request('/api/doc/imageSystem/getRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  get,
  getRegion,
}
