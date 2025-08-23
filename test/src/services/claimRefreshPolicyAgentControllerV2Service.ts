
import request from '@/utils/request';

export async function refreshAgentV2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/refreshAgentV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  refreshAgentV2,
}
