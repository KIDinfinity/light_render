
import request from '@/utils/request';

export async function advancedQueryRich(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/user/advancedQueryRich', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  advancedQueryRich,
}
