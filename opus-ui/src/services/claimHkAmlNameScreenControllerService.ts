
import request from '@/utils/request';

export async function refreshNameScreen(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/refreshNameScreen', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  refreshNameScreen,
}
