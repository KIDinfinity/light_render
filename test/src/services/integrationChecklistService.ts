import request from '@/utils/request';

export async function getIntegrationChecklist(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/getIntegrationChecklist', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function retry(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/manualRetryStuckCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}
