
import request from '@/utils/request';

export async function getInstantPaymentTransaction(params?: any, option?: any): Promise<any> {
  return request('/api/claim/instantPayment/getInstantPaymentTransaction', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateInstantPaymentStatus(params?: any, option?: any): Promise<any> {
  return request('/api/claim/instantPayment/updateInstantPaymentStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateInstantPaymentTrigger(params?: any, option?: any): Promise<any> {
  return request('/api/claim/instantPayment/validateInstantPaymentTrigger', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInstantPaymentTransaction,
  updateInstantPaymentStatus,
  validateInstantPaymentTrigger,
}
