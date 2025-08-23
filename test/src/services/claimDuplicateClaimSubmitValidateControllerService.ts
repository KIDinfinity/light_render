
import request from '@/utils/request';

export async function duplicateClaimSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/duplicateClaimSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  duplicateClaimSubmit,
}
