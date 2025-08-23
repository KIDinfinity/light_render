
import request from '@/utils/request';

export async function claimRegisterSucceeded(params?: any, option?: any): Promise<any> {
  return request('/api/claim/integration/claimRegisterSucceeded', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  claimRegisterSucceeded,
}
