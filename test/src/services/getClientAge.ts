
import request from '@/utils/request';

export async function getClientAge(params?: any, option?: any): Promise<any> {
  return request('/api/nb/client/calculateAge', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  getClientAge
}
