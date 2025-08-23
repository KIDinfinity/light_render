
import request from '@/utils/request';

export async function triggerJob(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/HNWCustomer/triggerJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateCase(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/HNWCustomer/updateCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  triggerJob,
  updateCase,
}
