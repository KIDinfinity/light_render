
import { stringify } from 'qs';
import request from '@/utils/request';

export async function sendAsync(params?: any, option?: any): Promise<any> {
  return request('/api/integration/correspondence/sendAsync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendImmediately(params?: any, option?: any): Promise<any> {
  return request('/api/integration/correspondence/sendImmediately', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function triggerCorrespondenceTask(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/correspondence/triggerCorrespondenceTask?${stringify(params)}`, {
    ...option,
  });
}

export default {
  sendAsync,
  sendImmediately,
  triggerCorrespondenceTask,
}
