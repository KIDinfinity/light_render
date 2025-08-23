
import { stringify } from 'qs';
import request from '@/utils/request';

export async function down(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/sql/file/down?${stringify(params)}`, {
    ...option,
  });
}

export async function exec(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/file/exec', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/file/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/file/upload', {
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
