import request from '@/utils/request';

export async function address(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/address', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByPostalCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/findByPostalCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchMedicalProvider(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/searchMedicalProvider', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  address,
  findByPostalCode,
  searchMedicalProvider,
};
