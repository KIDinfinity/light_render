
import { stringify } from 'qs';
import request from '@/utils/request';

export async function manual(params?: any, option?: any): Promise<any> {
  return request('/api/rc/batch/scheduler/manual', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refresh(params?: any, option?: any): Promise<any> {
  return request('/api/rc/batch/scheduler/refresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function regenerate(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/batch/scheduler/regenerate?${stringify(params)}`, {
    ...option,
  });
}

export default {
  manual,
  refresh,
  regenerate,
}
