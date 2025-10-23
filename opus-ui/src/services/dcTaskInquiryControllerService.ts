
import request from '@/utils/request';

export async function advSearch(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/inquiry/advSearch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function advSearchExport(params?: any, option?: any): Promise<any> {
  return request('/api/dw/task/inquiry/advSearchExport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advSearch,
  advSearchExport,
}
