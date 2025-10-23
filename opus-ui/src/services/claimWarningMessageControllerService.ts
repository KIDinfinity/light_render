
import request from '@/utils/request';

export async function test(params?: any, option?: any): Promise<any> {
  return request('/api/claim/wm/test', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  test,
}
