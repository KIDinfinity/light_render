
import request from '@/utils/request';

export async function createClaimCaseValidate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/create/validate/createClaimCaseValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  createClaimCaseValidate,
}
