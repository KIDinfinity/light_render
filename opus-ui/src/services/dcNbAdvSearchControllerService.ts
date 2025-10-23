
import request from '@/utils/request';

export async function history(params?: any, option?: any): Promise<any> {
  return request('/api/dw/nb/history', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  history,
}
