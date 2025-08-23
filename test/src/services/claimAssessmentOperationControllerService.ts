
import request from '@/utils/request';

export async function autoSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/submit/autoSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  autoSubmit,
}
