
import request from '@/utils/request';

export async function test(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/ruleCommonRpcBatch/test', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  test,
}
