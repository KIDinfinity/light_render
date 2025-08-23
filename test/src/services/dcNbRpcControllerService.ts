
import request from '@/utils/request';

export async function getNBPolicyDecisionSummary(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/nb/getNBPolicyDecisionSummary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getNBPolicyDecisionSummaryForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/nb/getNBPolicyDecisionSummaryForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getNBPolicyDecisionSummary,
  getNBPolicyDecisionSummaryForWool,
}
