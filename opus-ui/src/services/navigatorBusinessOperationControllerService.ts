
import request from '@/utils/request';

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/business/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  submit,
}
