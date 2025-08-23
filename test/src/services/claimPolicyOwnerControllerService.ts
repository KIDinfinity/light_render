
import request from '@/utils/request';

export async function getPolicyOwner(params?: any, option?: any): Promise<any> {
  return request('/api/claim/getPolicyOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyOwner,
}
