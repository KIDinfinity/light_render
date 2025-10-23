
import request from '@/utils/request';

export async function addPendingForFactConfirmation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/pendCategory/addPendingForFactConfirmation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function hasPendingForFactConfirmation(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/pendCategory/hasPendingForFactConfirmation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addPendingForFactConfirmation,
  hasPendingForFactConfirmation,
}
