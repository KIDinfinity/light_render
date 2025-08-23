
import request from '@/utils/request';

export async function gengerateEcmUrl(params?: any, option?: any): Promise<any> {
  return request('/api/integration/ecm/gengerateEcmUrl', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  gengerateEcmUrl,
}
