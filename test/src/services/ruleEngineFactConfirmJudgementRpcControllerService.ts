
import request from '@/utils/request';

export async function factConfirmJudgement(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/claim/factConfirmJudgement', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function factConfirmJudgementContainFormula(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/claim/factConfirmJudgementContainFormula', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  factConfirmJudgement,
  factConfirmJudgementContainFormula,
}
