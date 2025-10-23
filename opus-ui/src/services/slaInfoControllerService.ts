
import request from '@/utils/request';

export async function caseSLA(params?: any, option?: any): Promise<any> {
  return request('/api/sla/info/caseSLA', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  caseSLA,
}
