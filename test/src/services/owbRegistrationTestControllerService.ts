
import request from '@/utils/request';

export async function testRuleCommonRpcBatch(params?: any, option?: any): Promise<any> {
  return request('/api/registration/testRuleCommonRpcBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  testRuleCommonRpcBatch,
}
