
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getDataImageById(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/image/getDataImageById?${stringify(params)}`, {
    ...option,
  });
}

export async function getVersionData(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/image/getVersionData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getVersionDataDetail(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/image/getVersionDataDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getVersionDataTimeBar(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/data/image/getVersionDataTimeBar', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDataImageById,
  getVersionData,
  getVersionDataDetail,
  getVersionDataTimeBar,
}
