import request from '@/utils/request';

export async function search(params?: any, option?: any): Promise<any> {
  return request('/api/claim/payee/address/search', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPayeeInformation(params?: any, option?: any): Promise<any> {
  return request('/api/claim/payee/getPayeeInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  search,
  getPayeeInformation,
};
