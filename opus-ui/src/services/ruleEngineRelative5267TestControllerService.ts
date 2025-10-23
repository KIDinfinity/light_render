
import request from '@/utils/request';

export async function relative5267Test(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/claim/relative5267Test', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  relative5267Test,
}
