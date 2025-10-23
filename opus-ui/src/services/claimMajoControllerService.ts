import request from '@/utils/request';

export async function retrieveFundValuesV2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/major/retrieveFundValuesV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  retrieveFundValuesV2,
};
