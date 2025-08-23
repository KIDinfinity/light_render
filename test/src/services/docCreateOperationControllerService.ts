
import request from '@/utils/request';

export async function unknownCreate(params?: any, option?: any): Promise<any> {
  return request('/api/doc/create/unknownCreate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  unknownCreate,
}
