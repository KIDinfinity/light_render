
import request from '@/utils/request';

export async function createCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/paymentTrack/createCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/paymentTrack/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  createCase,
  submit,
}
