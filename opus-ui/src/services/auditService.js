import request from '@/utils/request';

export async function addAuditLog(params) {
  return request('/api/dc/audit/addAuditLog', {
    method: 'POST',
    body: params,
  });
}

export async function getAuditLogs(params) {
  return request('/api/dc/audit/getAuditLogs', {
    method: 'POST',
    body: params,
  });
}

export async function page(params) {
  return request('/api/dc/audit/getAuditLogs/page', {
    method: 'POST',
    body: params,
  });
}

export default {
  addAuditLog,
  getAuditLogs,
  page,
};
