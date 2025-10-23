
import { stringify } from 'qs';
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request('/api/misc/promptMessage/get', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ping(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/promptMessage/ping?${stringify(params)}`, {
    ...option,
  });
}

export async function ping2(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/promptMessage/ping2?${stringify(params)}`, {
    ...option,
  });
}

export default {
  get,
  ping,
  ping2,
}
