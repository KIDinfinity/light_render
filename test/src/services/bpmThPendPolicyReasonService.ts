
import request from '@/utils/request';

export async function getThPendPolicyReasons(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/pend/th/getThPendPolicyReasons', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getThPendPolicyReasons,
}
