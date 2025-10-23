
import request from '@/utils/request';

export async function businessCheck(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/jp/bpo/businessCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  businessCheck,
}
