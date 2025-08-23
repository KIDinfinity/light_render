import request from '@/utils/request';

export async function refresh(params?: any, option?: any): Promise<any> {
  return request('/api/nb/premiumEnquiry/refresh', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateTransfer(params?: any, option?: any): Promise<any> {
  return request('/api/nb/premium/validateTransfer', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function transfer(params?: any, option?: any): Promise<any> {
  return request('/api/nb/premium/transfer', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/api/nb/premium/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancel(params?: any, option?: any): Promise<any> {
  return request('/api/nb/premium/cancel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  refresh,
  validateTransfer,
  transfer,
  save,
  cancel,
};
