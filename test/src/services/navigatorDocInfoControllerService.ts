
import request from '@/utils/request';

export async function checkBeforeSubmit(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/docInfo/checkBeforeSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkBeforeSubmit,
}
