
import request from '@/utils/request';

export async function manualCreate(params?: any, option?: any): Promise<any> {
  return request('/api/srv/create/manualCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submissionCreate(params?: any, option?: any): Promise<any> {
  return request('/api/srv/create/submissionCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function supplement(params?: any, option?: any): Promise<any> {
  return request('/api/srv/submission/supplement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  manualCreate,
  submissionCreate,
  supplement,
}
