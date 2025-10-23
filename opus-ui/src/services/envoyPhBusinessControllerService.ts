
import request from '@/utils/request';

export async function checkClaimAckEmail(params?: any, option?: any): Promise<any> {
  return request('/api/evy/reasons/ph/checkClaimAckEmail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkClaimAckEmail,
}
