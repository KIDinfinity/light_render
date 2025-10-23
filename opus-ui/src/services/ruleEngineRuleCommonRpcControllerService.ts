
import request from '@/utils/request';

export async function downloadDyClassFile(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/downloadDyClassFile', {
    ...option,
    method: 'POST',
    body: params,
  });
}

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

export async function ruleCommonRpcBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/ruleCommonRpcBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function ruleCommonRpcTest(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/ruleCommonRpcTest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  downloadDyClassFile,
  listDomainByRuleSetId,
  ruleCommonRpc,
  ruleCommonRpcBatch,
  ruleCommonRpcTest,
}
