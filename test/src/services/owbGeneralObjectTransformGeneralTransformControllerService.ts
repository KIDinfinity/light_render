
import request from '@/utils/request';

export async function generalTransform(params?: any, option?: any): Promise<any> {
  return request('/api/got/generalTransform', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  generalTransform,
}
