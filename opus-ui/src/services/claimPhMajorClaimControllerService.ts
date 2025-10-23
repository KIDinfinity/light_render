
import request from '@/utils/request';

export async function fundValueValidation(params?: any, option?: any): Promise<any> {
  return request('/api/claim/major/fundValueValidation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retrieveFundValues(params?: any, option?: any): Promise<any> {
  return request('/api/claim/major/retrieveFundValues', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  fundValueValidation,
  retrieveFundValues,
}
