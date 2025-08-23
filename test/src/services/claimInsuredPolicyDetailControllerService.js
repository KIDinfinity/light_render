import request from '@/utils/request';

export async function getInsuredPolicyDetailList(params) {
  return request('/api/claim/assessment/incident/insuredPolicy/getInsuredPolicyDetailList', {
    method: 'POST',
    body: params,
  });
}

export default {
  getInsuredPolicyDetailList,
};
