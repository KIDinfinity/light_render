
import request from '@/utils/request';

export async function ad(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/thirdpartyauth/ad', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  ad,
}
