
import request from '@/utils/request';

export async function findAllDashboardCodes(params?: any, option?: any): Promise<any> {
  return request('/rpc/report/findAllDashboardCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllReportInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/report/findAllReportInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllDashboardCodes,
  findAllReportInfo,
}
