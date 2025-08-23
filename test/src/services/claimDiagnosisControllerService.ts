import request from '@/utils/request';

export async function retrieve3Cilndicator(params?: any, option?: any): Promise<any> {
  return request('/api/claim/diagnosis/retrieve3Cilndicator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function retrieveSimpleDisease(params?: any, option?: any): Promise<any> {
  return request('/api/claim/diagnosis/retrieveSimpleDisease', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  retrieve3Cilndicator,
  retrieveSimpleDisease,
};
