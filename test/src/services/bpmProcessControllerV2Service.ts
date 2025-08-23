
import request from '@/utils/request';

export async function cancel(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/process/cancel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancelByCreateTime(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/process/cancelByCreateTime', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function start(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/process/start', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cancel,
  cancelByCreateTime,
  start,
}
