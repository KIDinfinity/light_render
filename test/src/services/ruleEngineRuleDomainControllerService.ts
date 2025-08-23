
import request from '@/utils/request';

export async function refreshDomianClass(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/refreshDomianClass', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  refreshDomianClass,
}
