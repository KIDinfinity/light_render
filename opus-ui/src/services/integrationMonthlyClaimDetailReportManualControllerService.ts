
import request from '@/utils/request';

export async function generateReport(params?: any, option?: any): Promise<any> {
  return request('/api/integration/report/generateReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryReport(params?: any, option?: any): Promise<any> {
  return request('/api/integration/report/queryReport', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  generateReport,
  queryReport,
}
