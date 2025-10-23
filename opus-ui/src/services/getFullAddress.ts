import request from '@/utils/request';

export async function getFullAddress(params?: any, option?: any): Promise<any> {
  return request('/api/nb/client/getFullAddress', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getFullAddress,
};
