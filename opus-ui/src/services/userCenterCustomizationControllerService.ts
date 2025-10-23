
import request from '@/utils/request';

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/customization/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/uc/customization/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByUserId,
  update,
}
