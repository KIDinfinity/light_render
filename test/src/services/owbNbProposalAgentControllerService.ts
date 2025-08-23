import request from '@/utils/request';

export async function getAgentFromAS(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/agent/getAgentFromAS', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAgentBankList(params?: any, option?: any): Promise<any> {
  return request('/api/nb/proposal/agent/getAgentBankList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAgentFromAS,
  getAgentBankList,
};
