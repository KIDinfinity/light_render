
import request from '@/utils/request';

export async function confirm(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/manual/workflow/confirm', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  confirm,
}
