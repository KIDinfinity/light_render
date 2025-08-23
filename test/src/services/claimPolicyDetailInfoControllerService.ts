
import request from '@/utils/request';

export async function policyDetailInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/policyDetailInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  policyDetailInfo,
}
