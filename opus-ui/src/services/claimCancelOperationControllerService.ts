
import request from '@/utils/request';

export async function cancelHkCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/cancel/cancelHkCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cancelPhCaseValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/cancel/cancelPhCaseValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cancelHkCase,
  cancelPhCaseValidate,
}
