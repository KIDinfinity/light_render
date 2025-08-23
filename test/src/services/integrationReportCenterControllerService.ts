
import request from '@/utils/request';

export async function getReportList(params?: any, option?: any): Promise<any> {
  return request('/api/integration/reportcenter/getReportList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function print(params?: any, option?: any): Promise<any> {
  return request('/api/integration/reportcenter/print', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function search(params?: any, option?: any): Promise<any> {
  return request('/api/integration/reportcenter/search', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getReportList,
  print,
  search,
}
