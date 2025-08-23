
import request from '@/utils/request';

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/smartCreate/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  v2,
}
