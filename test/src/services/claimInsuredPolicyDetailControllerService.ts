
import request from '@/utils/request';

export async function getInsuredPolicyDetailList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/assessment/incident/insuredPolicy/getInsuredPolicyDetailList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsuredPolicyDetailList,
}
