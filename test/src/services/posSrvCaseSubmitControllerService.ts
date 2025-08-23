
import request from '@/utils/request';

export async function auto(params?: any, option?: any): Promise<any> {
  return request('/api/srv/assess/auto', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitSrvCase(params?: any, option?: any): Promise<any> {
  return request('/api/srv/submit/submitSrvCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitSrvDecision(params?: any, option?: any): Promise<any> {
  return request('/api/srv/submit/submitSrvDecision', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  auto,
  submitSrvCase,
  submitSrvDecision,
}
