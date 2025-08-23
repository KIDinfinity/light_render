
import request from '@/utils/request';

export async function getAgentNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/getAgentNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyAgent(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/getPolicyAgent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAgentNo,
  getPolicyAgent,
}
