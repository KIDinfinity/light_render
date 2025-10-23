
import request from '@/utils/request';

export async function deployByExcel(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/deployByExcel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deployByExcel,
}
