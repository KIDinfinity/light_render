
import { stringify } from 'qs';
import request from '@/utils/request';

export async function insert(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dashboard/insert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listAllSearchFieldValues(params?: any, option?: any): Promise<any> {
  return request(`/api/rc/dashboard/listAllSearchFieldValues?${stringify(params)}`, {
    ...option,
  });
}

export async function queryChartData(params?: any, option?: any): Promise<any> {
  return request('/api/rc/dashboard/queryChartData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  insert,
  listAllSearchFieldValues,
  queryChartData,
}
