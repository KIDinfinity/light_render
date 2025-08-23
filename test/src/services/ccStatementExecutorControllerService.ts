
import { stringify } from 'qs';
import request from '@/utils/request';

export async function datasource(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/sql/statement/datasource?${stringify(params)}`, {
    ...option,
  });
}

export async function exec(params?: any, option?: any): Promise<any> {
  return request('/api/cc/sql/statement/exec', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  datasource,
  exec,
}
