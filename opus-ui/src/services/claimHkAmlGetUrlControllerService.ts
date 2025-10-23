
import request from '@/utils/request';

export async function getUrl(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hk/fcrm/getUrl', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getUrl,
}
