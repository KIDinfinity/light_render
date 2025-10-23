
import request from '@/utils/request';

export async function registerHkClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/register/registerHkClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  registerHkClaimCase,
}
