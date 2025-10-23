
import request from '@/utils/request';

export async function listDomainByRuleSetId(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/listDomainByRuleSetId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ruleCommonRpc(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/ruleCommonRpc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listDomainByRuleSetId,
  ruleCommonRpc,
}
