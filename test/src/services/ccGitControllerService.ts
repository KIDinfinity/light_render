
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getCredentials(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/git/getCredentials?${stringify(params)}`, {
    ...option,
  });
}

export async function setCredentials(params?: any, option?: any): Promise<any> {
  return request('/api/cc/git/setCredentials', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCredentials,
  setCredentials,
}
