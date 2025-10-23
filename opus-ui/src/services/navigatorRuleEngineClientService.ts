
import request from '@/utils/request';

export async function calculateProcessColor(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/calculateProcessColor', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  calculateProcessColor,
}
