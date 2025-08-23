
import request from '@/utils/request';

export async function addAuditLog(params?: any, option?: any): Promise<any> {
  return request('/api/dc/audit/addAuditLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAuditLogs(params?: any, option?: any): Promise<any> {
  return request('/api/dc/audit/getAuditLogs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/dc/audit/getAuditLogs/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addAuditLog,
  getAuditLogs,
  page,
}
