import request from '@/utils/request';

export async function updateInfo(params?: any, option?: any): Promise<any> {
  return request('/api/uc/guide/updateInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/customization/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  updateInfo,
  findByUserId,
};
