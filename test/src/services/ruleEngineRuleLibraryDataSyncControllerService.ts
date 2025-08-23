
import request from '@/utils/request';

export async function ruleLibraryDataSync(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/ruleLibraryDataSync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  ruleLibraryDataSync,
}
