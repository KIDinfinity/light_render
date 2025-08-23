import request from '@/utils/request';

export async function excuteProcessOverview(params?: any, option?: any): Promise<any> {
  return request('/rpc/case/mgnt/relationship/excuteProcessOverview', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getRuleResultByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/ruleResult/getRuleResultByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  excuteProcessOverview,
  getRuleResultByCaseNo,
};
