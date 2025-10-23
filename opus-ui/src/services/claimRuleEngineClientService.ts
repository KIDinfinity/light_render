
import request from '@/utils/request';

export async function factConfirmJudgementContainFormula(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/claim/factConfirmJudgementContainFormula', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimType(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/claim/getClaimType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualAssessment(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/processDirect/manualAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  factConfirmJudgementContainFormula,
  getClaimType,
  manualAssessment,
}
