import request from '@/utils/request';

export async function generateReport(params) {
  return request('/api/integration/report/generateReport', {
    method: 'POST',
    body: params,
  });
}

export async function queryReport(params) {
  return request('/api/integration/report/queryReport', {
    method: 'POST',
    body: params,
  });
}

export default {
  generateReport,
  queryReport,
};
