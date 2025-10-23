
import { stringify } from 'qs';
import request from '@/utils/request';

export async function down(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/sql/down?${stringify(params)}`, {
    ...option,
  });
}

export async function exec(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/exec', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function list(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/sql/list?${stringify(params)}`, {
    ...option,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/upload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  down,
  exec,
  list,
  upload,
}
