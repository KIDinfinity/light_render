import request from '@/utils/request';

export async function updateUWDecision(params?: any, option?: any): Promise<any> {
  return request('/api/nb/supplyUwDecisionEditInd', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default { updateUWDecision };
